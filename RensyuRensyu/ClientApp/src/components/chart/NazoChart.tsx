import * as React from 'react';
//import { RouteComponentProps } from 'react-router';
//import * as NazoChartStore from '../../store/chart/NazoChart';
//import { connect } from 'react-redux';
//import { ApplicationState } from '../../store';
//import { Line } from 'react-chartjs-2';

///**
// * 状態と処理の定義です。
// */
//type NazoChartProps =
//    NazoChartStore.NazoChartState &
//    typeof NazoChartStore.actionCreators &
//    RouteComponentProps<{}>;    // TODO:URLに引数がある場合は{userId: string}のように書く

///**
// * グラフを描画します。
// */
//class NazoChart extends React.PureComponent<NazoChartProps> {
//    public render() {
//        const data = {
//            labels: ['April', 'May', 'June', 'July', 'August', 'September'],
//            datasets: [
//                {
//                    data: [67, 79, 52, 41, 66, 43],
//                    // 省略 
//                },
//            ],
//        };
//        const options = {
//            // 省略 
//        };
//        return (
//            <Line data={data} options={options} />
//        );
//    }
//} 



//export default connect(
//    (state: ApplicationState) => state.nazochart,
//    NazoChartStore.actionCreators
//)(NazoChart);









