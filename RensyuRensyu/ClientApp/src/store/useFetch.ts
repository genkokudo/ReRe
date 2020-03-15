﻿import { useEffect, useReducer } from 'react';

const initialState = {
    loading: false, // データ取得中はtrueに設定される
    error: null,        // データ取得でエラーになると設定される
    data: null,         // データ取得結果が設定される
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'init': // 初期状態に戻す
            return initialState;
        case 'start': // データ取得を開始する
            return { ...state, loading: true };
        case 'data': // データ取得が正常終了する
            return { ...state, loading: false, data: action.data };
        case 'error': // データ取得がエラー終了する
            return { ...state, loading: false, error: action.error };
        default: // それ以外は起こりえないのでバグ検知のためthrow
            throw new Error('no such action type');
    }
};

const defaultOpts = {}; // デフォルトでは空オプション
const defaultReadBody: any = (body: any) => body.json(); // デフォルトではjsonとしてparseする

export const useFetch = (
    url: any,
    opts = defaultOpts,
    readBody = defaultReadBody,
) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        let dispatchSafe: any = (action: any) => dispatch(action); // cleanupで無効にするため
        const abortController = new AbortController(); // cleanupでabortするため
        (async () => {
            if (!url) return;
            dispatchSafe({ type: 'start' });
            try {
                const response = await fetch(url, {
                    ...opts,
                    signal: abortController.signal,
                });
                if (response.ok) {
                    const body = await readBody(response);
                    dispatchSafe({ type: 'data', data: body });
                } else {
                    const e = new Error(`Fetch failed: ${response.statusText}`);
                    dispatchSafe({ type: 'error', error: e });
                }
            } catch (e) {
                dispatchSafe({ type: 'error', error: e });
            }
        })();
        const cleanup = () => {
            dispatchSafe = () => null; // we should not dispatch after unmounted.
            abortController.abort();
            dispatch({ type: 'init' });
        };
        return cleanup;
    }, [url, opts, readBody]);
    return state;
};