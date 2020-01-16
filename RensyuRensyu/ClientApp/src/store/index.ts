import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';

// 最上位の状態オブジェクト
// 全画面で共有できる。グローバル変数みたいな感じ
export interface ApplicationState {
    counter: Counter.CounterState | undefined;  // 現在のカウント
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;   // 取得した各地の天気
}

// アクションがディスパッチされるたびに、Reduxは、名前が一致するREDUCERを使用して各トップレベルのアプリケーション状態プロパティを更新します。
// 名前が正確に一致すること、およびREDUCERが重要です。
// 対応するApplicationStateプロパティタイプに作用します。
export const reducers = {
    counter: Counter.reducer,   // カウンター画面の処理
    weatherForecasts: WeatherForecasts.reducer   // 天気予報画面の処理
};

// このタイプは、アクションクリエーターのヒントとして使用できるため、
// 「dispatch」および「getState」パラメーターがストアに一致するように正しく入力されます。
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
