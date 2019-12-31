import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/WeatherForecasts';

// ���s���ɁARedux�̓}�[�W����܂�...
type WeatherForecastProps =
    WeatherForecastsStore.WeatherForecastsState // ... Redux�X�g�A���烊�N�G�X�g�������
    & typeof WeatherForecastsStore.actionCreators // ... ����Ƀ��N�G�X�g�����A�N�V�����N���G�[�^�[
    & RouteComponentProps<{ startDateIndex: string }>; // ... ����ђ��M���[�e�B���O�p�����[�^


class FetchData extends React.PureComponent<WeatherForecastProps> {
    // ���̃��\�b�h�́A�R���|�[�l���g���h�L�������g�ɍŏ��ɒǉ����ꂽ�Ƃ��ɌĂяo����܂�
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // ���̃��\�b�h�́A���[�g�p�����[�^���ύX�����ƌĂяo����܂�
    public componentDidUpdate() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">�V�C�\��</h1>
                <p>���̃R���|�[�l���g�́A�T�[�o�[����f�[�^���擾���AURL�p�����[�^�[�𑀍삷����@�������Ă��܂��B</p>
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
    (state: ApplicationState) => state.weatherForecasts, // �ǂ̏�ԃv���p�e�B���R���|�[�l���g�̏�����Ƀ}�[�W���邩��I�����܂�
    WeatherForecastsStore.actionCreators // �R���|�[�l���g�̏�����Ƀ}�[�W����A�N�V�����쐬�҂�I�����܂�
)(FetchData as any);
