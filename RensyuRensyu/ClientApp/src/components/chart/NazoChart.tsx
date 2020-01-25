/* ---- NazoChart.tsx 見た目・コンポーネント ---- */
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as NazoChartStore from '../../store/chart/NazoChart';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

/**
 * 状態と処理の定義です。
 */
type NazoChartProps =
    NazoChartStore.NazoChartState &
    typeof NazoChartStore.actionCreators &
    RouteComponentProps<{}>;    // TODO:URLに引数がある場合は{userId: string}のように書く

/**
 * 表を選択するメニューを定義します。
 */
class NazoChart extends React.PureComponent<NazoChartProps> {
    public render() {
        return (
        );
    }
}

export default connect(
    (state: ApplicationState) => state.nazochart,
    NazoChartStore.actionCreators
)(NazoChart);









