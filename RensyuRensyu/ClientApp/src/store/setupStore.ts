import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { reducers } from './';
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

/**
 * Reduxで扱うStoreを設定する、index.tsで呼び出してReact(Redux)で使用する
 * @param history
 * @param initialState
 */
export default function setupStore(history: History) {
    const middlewares = [
        ...getDefaultMiddleware(),  // toolkitのデフォルトミドルウェア：状態の比較などを行うらしい
        thunk,  // 引数から関数を作る仕組み
        routerMiddleware(history)   // 今のpath, hashなどを簡単に取得できるようにする仕組み、他のpageへのナビゲートをする仕組み
    ];

    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)
    });

    const store = configureStore({
        reducer: rootReducer,
        middleware: middlewares
    });

    return store;
}

// TODO: 全てhooksで書く場合、index.tsのApplicationState, AppThunkActionは不要。