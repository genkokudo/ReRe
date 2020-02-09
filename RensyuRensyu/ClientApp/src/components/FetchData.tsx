import * as React from 'react';
//import { connect } from 'react-redux';
//import { RouteComponentProps } from 'react-router';
//import { Link } from 'react-router-dom';
//import { ApplicationState } from '../store';
//import * as WeatherForecastsStore from '../store/WeatherForecasts';
///*
// * 天気予報画面の表示
// */

//// 実行時に、Reduxはマージされます...
//type WeatherForecastProps =
//    WeatherForecastsStore.WeatherForecastsState // ... Reduxストアからリクエストした状態（子にWeatherForecastという状態配列を持つ）
//    & typeof WeatherForecastsStore.actionCreators // ... リクエストしたアクションクリエーター
//    & RouteComponentProps<{ startDateIndex: string }>; // ... 着信ルーティングパラメータ（アドレスの引数）

///*
// * 天気予報画面
// */
//class FetchData extends React.PureComponent<WeatherForecastProps> {
//    // このメソッドは、コンポーネントがドキュメントに最初に追加されたときに呼び出されます
//    public componentDidMount() {
//        this.ensureDataFetched();
//    }

//    // このメソッドは、ルートパラメータが変更されると呼び出されます
//    public componentDidUpdate() {
//        this.ensureDataFetched();
//    }

//    public render() {
//        return (
//            <React.Fragment>
//                <h1 id="tabelLabel">天気予報</h1>
//                <p>このコンポーネントは、サーバーからデータを取得し、URLパラメーターを操作する方法を示しています。</p>
//                {this.renderForecastsTable() /* 表 */}
//                {this.renderPagination() /* ページ送りボタン */}
//            </React.Fragment>
//        );
//    }

//    // tsの方のrequestWeatherForecastsを呼び出す
//    private ensureDataFetched() {
//        const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;   // this.props.match.params.startDateIndexでアドレスの引数が取れる
//        this.props.requestWeatherForecasts(startDateIndex); // 引数のデータ番号でサーバからデータ取得
//    }

//    // 表を作る
//    // データ構造を指定して、それを用いて表示
//    private renderForecastsTable() {
//        return (
//            <table className='table table-striped' aria-labelledby="tabelLabel">
//                <thead>
//                    <tr>
//                        <th>日付</th>
//                        <th>摂氏(C)</th>
//                        <th>華氏(F)</th>
//                        <th>結果</th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {/* 現在の状態を使用してデータを表示 */}
//                    {this.props.forecasts.map((forecast: WeatherForecastsStore.WeatherForecast) =>
//                        <tr key={forecast.date}>
//                            <td>{forecast.date}</td>
//                            <td>{forecast.temperatureC}</td>
//                            <td>{forecast.temperatureF}</td>
//                            <td>{forecast.summary}</td>
//                        </tr>
//                    )}
//                </tbody>
//            </table>
//        );
//    }

//    // ページを付ける
//    private renderPagination() {
//        const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
//        const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

//        return (
//            <div className="d-flex justify-content-between">
//                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
//                {this.props.isLoading && <span>Loading...</span>}
//                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>
//            </div>
//        );
//    }
//}

//export default connect(
//    (state: ApplicationState) => state.weatherForecasts, // どの状態プロパティをコンポーネントの小道具にマージするかを選択します
//    WeatherForecastsStore.actionCreators // コンポーネントの小道具にマージするアクション作成者を選択します
//)(FetchData as any);
