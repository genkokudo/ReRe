import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - Reduxストアで保持されるデータのタイプを定義します。

export interface WeatherForecastsState {
    isLoading: boolean;
    startDateIndex?: number;
    forecasts: WeatherForecast[];
}

export interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

// -----------------
// ACTIONS - これらは、状態遷移のシリアル化可能な（したがって再生可能な）説明です。
// それらには副作用はありません。彼らは起こることを説明するだけです。

interface RequestWeatherForecastsAction {
    type: 'REQUEST_WEATHER_FORECASTS';
    startDateIndex: number;
}

interface ReceiveWeatherForecastsAction {
    type: 'RECEIVE_WEATHER_FORECASTS';
    startDateIndex: number;
    forecasts: WeatherForecast[];
}

// 差別化された組合」型を宣言します。 これにより、「type」プロパティへのすべての参照に、
// 宣言されたタイプ文字列のいずれかが含まれることが保証されます（他の任意の文字列は含まれません）。
type KnownAction = RequestWeatherForecastsAction | ReceiveWeatherForecastsAction;

// ----------------
// ACTION CREATORS - これらは、状態遷移をトリガーするUIコンポーネントに公開される関数です。
// 状態を直接変化させることはありませんが、外部の副作用（データの読み込みなど）を引き起こす可能性があります。

export const actionCreators = {
    requestWeatherForecasts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // まだ持っていない（そしてまだ読み込まれていない）データのみを読み込みます
        const appState = getState();
        if (appState && appState.weatherForecasts && startDateIndex !== appState.weatherForecasts.startDateIndex) {
            fetch(`weatherforecast`)
                .then(response => response.json() as Promise<WeatherForecast[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', startDateIndex: startDateIndex, forecasts: data });
                });

            dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
        }
    }
};

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
        case 'REQUEST_WEATHER_FORECASTS':
            return {
                startDateIndex: action.startDateIndex,
                forecasts: state.forecasts,
                isLoading: true
            };
        case 'RECEIVE_WEATHER_FORECASTS':
            // 最新のリクエストに一致する場合にのみ、着信データを受け入れます。
            // これにより、順不同の応答を正しく処理できます。
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    forecasts: action.forecasts,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
