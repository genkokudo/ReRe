//import * as React from 'react';
//import { connect } from 'react-redux';
//import { RouteComponentProps } from 'react-router';
//import { ApplicationState } from '../store';
//import * as CounterStore from '../store/Counter';
///*
// * カウンター画面の表示
// */

//// Reduxの機能
//// Reduxで保持する値、メソッド、ルーティング設定を組み合わせる
//// CounterStateはinterface、actionCreatorsはメソッドの列挙
//type CounterProps =
//    CounterStore.CounterState & // count
//    typeof CounterStore.actionCreators &    // increment, decrement
//    RouteComponentProps<{}>;    // URLにパラメータがある場合は{userId: string}のように引数を書く

//// 上で作成したCounterPropsを使用してクラスを定義
//class Counter extends React.PureComponent<CounterProps> {   // このように引数にtype指定するとthis.propsでアクセスできる
//    public render() {
//        return (
//            <React.Fragment>
//                <h1>カウンター</h1>
//                <p>これは、Reactコンポーネントの簡単な例です。</p>

//                {/* aria-live="polite" はスクリーンリーダー関係の設定 */}
//                <p aria-live="polite">現在のカウント: <strong>{this.props.count}</strong></p>

//                <button type="button" className="btn btn-primary btn-lg" onClick={() => { this.props.increment(); }}>増やす</button>
//            </React.Fragment>
//        );
//    }
//};

//// connect関数：ReactコンポーネントをRedux storeに接続します。
//// ※Reduxを使用する場合、Reactとstoreは分断されているためにComponentは値の取得と変更が行えない。そのためにconnect関数が必要。
//export default connect(
//    // 接続するstore情報を書く
//    (state: ApplicationState) => state.counter,    // ApplicationStateはindex.tsで定義している全画面共有の状態から、CounterStateを持ってくる。propsに入れて子コンポーネントに渡す。
//    CounterStore.actionCreators // dispatchを呼び出す関数をpropsに入れて子コンポーネントに渡す
//)(Counter);
//// こうすることで、this.props.increment();でActionが呼び出される