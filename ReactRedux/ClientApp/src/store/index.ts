import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';

// 最上位の状態オブジェクト
export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
}

// アクションがディスパッチされるたびに、Reduxは、名前が一致するリデューサーを使用して各トップレベルのアプリケーション状態プロパティを更新します。
// 名前が正確に一致すること、およびレデューサーが重要です。
// 対応するApplicationStateプロパティタイプに作用します。
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer
};

// このタイプは、アクションクリエーターのヒントとして使用できるため、
// 「dispatch」および「getState」パラメーターがストアに一致するように正しく入力されます。
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
