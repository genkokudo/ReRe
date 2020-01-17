import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - Reduxストアで保持されるデータのタイプを定義します。

/**
 * 表の状態
 */
export interface WeatherForecastsState {
    isLoading: boolean;
    startDateIndex?: number;    // 現在表示中のデータ開始番号
    forecasts: WeatherForecast[];   // 別の状態の配列を持つ
}

/**
 * 1件のデータ
 */
export interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

// -----------------
// ACTIONS - これらは、状態遷移のシリアル化可能な（したがって再生可能な）説明です。
// それらには副作用はありません。彼らは起こることを説明するだけです。

// 要するに、メソッドの種類名と引数を定義している。

/*
 * 
 */
interface RequestWeatherForecastsAction {
    type: 'REQUEST_WEATHER_FORECASTS';
    startDateIndex: number;
}

/*
 * サーバから取得したデータを格納する
 */
interface ReceiveWeatherForecastsAction {
    type: 'RECEIVE_WEATHER_FORECASTS';
    startDateIndex: number;
    forecasts: WeatherForecast[];
}

// 「差別化された組合」型を宣言します。 これにより、「type」プロパティへのすべての参照に、
// 宣言されたタイプ文字列のいずれかが含まれることが保証されます（他の任意の文字列は含まれません）。
type KnownAction = RequestWeatherForecastsAction | ReceiveWeatherForecastsAction;

// ----------------
// ACTION CREATORS - これらは、状態遷移をトリガーするUIコンポーネントに公開される関数です。
// 状態を直接変化させることはありませんが、外部の副作用（データの読み込みなど）を引き起こす可能性があります。

export const actionCreators = {
    // 未取得のデータをサーバから取得する
    requestWeatherForecasts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // 「まだ持っていない（そしてまだ読み込まれていない）データのみを読み込みます」…とコメントで書いていたが、都度サーバ問い合わせして再取得している模様。
        const appState = getState();
        // appStateが取得できる、appState.weatherForecastsがある（どこで初期化？）、引数が表の状態のページ番号と異なる
        if (appState && appState.weatherForecasts && startDateIndex !== appState.weatherForecasts.startDateIndex) {
            fetch(`weatherforecast`)    // ここでfetch APIを使用し、サーバ側のGETメソッドを呼んでいる。
                .then(response => response.json() as Promise<WeatherForecast[]>)    // jsonを通じてサーバ側のデータ構造をクライアントで定義したものに変換。
                .then(data => {
                    // 変換したデータを状態に加える
                    // dispatchするとreducerが呼ばれて処理が行われる
                    dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', startDateIndex: startDateIndex, forecasts: data });
                });

            // 恐らく、サーバからのデータ取得を待っているときの表示（早すぎて確認できない、↑が非同期処理なのでthen節は受信してから実行される）
            // 現在持っているデータを表示して、"Loading..."を表示する
            dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
        }
    }
};
// TODO:GET以外のメソッドの呼び方を調べておくこと

// ----------------
// REDUCER - 指定された状態とアクションに対して、新しい状態を返します。
// タイムトラベルをサポートするために、これは古い状態を変化させてはなりません。

const unloadedState: WeatherForecastsState = { forecasts: [], isLoading: false };

export const reducer: Reducer<WeatherForecastsState> = (state: WeatherForecastsState | undefined, incomingAction: Action): WeatherForecastsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        // 状態が持つデータを表の状態に送る
        // 状態が更新されれば、render()が呼ばれて再描画される
        case 'REQUEST_WEATHER_FORECASTS':
            return {
                startDateIndex: action.startDateIndex,
                forecasts: state.forecasts,    // 状態が持つデータ
                isLoading: true
            };
        // サーバからのデータを格納する
        case 'RECEIVE_WEATHER_FORECASTS':
            // 最新のリクエストに一致する場合にのみ、着信データを受け入れます。
            // これにより、順不同の応答を正しく処理できます。
            if (action.startDateIndex === state.startDateIndex) {   // 引数と状態のindexを比較
                // 現在のページであれば、データを表の状態に送る
                return {
                    startDateIndex: action.startDateIndex,
                    forecasts: action.forecasts,    // 引数が持つデータ
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
