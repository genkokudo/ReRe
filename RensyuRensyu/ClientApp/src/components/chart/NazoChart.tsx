import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as NazoChartStore from '../../store/chart/NazoChart';
import { connect } from 'react-redux';
import { Line, Bar } from 'react-chartjs-2';

/**
 * 状態と処理の定義です。
 */

/**
 * グラフを描画します。
 */
class NazoChart extends React.PureComponent {
    //private line() {
    //    const data = {
    //        labels: ['April', 'May', 'June', 'July', 'August', 'September'],
    //        datasets: [
    //            {
    //                data: [67, 79, 52, 41, 66, 43],
    //                // 省略 
    //            },
    //        ],
    //    };
    //    const options = {
    //        // 省略 
    //    };
    //    <Line data={data} options={options} />
    //}borderSkipped

    public render() {
        const data = {
            labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
            datasets: [{
                data: [4, 5, 9, 14, 18, 24, 28],
                backgroundColor: "blue"
            },
            {
                data: [0.4, 0.5, 0.9, 1.4, 1.5, 2, 4, 3.0],
                backgroundColor: "blue"
            }]
        };
        const options = {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        };
        return (
            <Bar data={data} options={options} />
        );

    }
} 



export default connect(
)(NazoChart);









