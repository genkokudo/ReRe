import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/WeatherForecasts';

// 実行時に、Reduxはマージされます...
type WeatherForecastProps =
    WeatherForecastsStore.WeatherForecastsState // ... Reduxストアからリクエストした状態
    & typeof WeatherForecastsStore.actionCreators // ... さらにリクエストしたアクションクリエーター
    & RouteComponentProps<{ startDateIndex: string }>; // ... および着信ルーティングパラメータ


class FetchData extends React.PureComponent<WeatherForecastProps> {
    // このメソッドは、コンポーネントがドキュメントに最初に追加されたときに呼び出されます
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // このメソッドは、ルートパラメータが変更されると呼び出されます
    public componentDidUpdate() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">天気予報</h1>
                <p>このコンポーネントは、サーバーからデータを取得し、URLパラメーターを操作する方法を示しています。</p>
                {this.renderForecastsTable()}
                {this.renderPagination()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        this.props.requestWeatherForecasts(startDateIndex);
    }

    private renderForecastsTable() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.forecasts.map((forecast: WeatherForecastsStore.WeatherForecast) =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    private renderPagination() {
        const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
        const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

        return (
            <div className="d-flex justify-content-between">
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
                {this.props.isLoading && <span>Loading...</span>}
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.weatherForecasts, // どの状態プロパティをコンポーネントの小道具にマージするかを選択します
    WeatherForecastsStore.actionCreators // コンポーネントの小道具にマージするアクション作成者を選択します
)(FetchData as any);
