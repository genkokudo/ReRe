import * as React from 'react';
//import { connect } from 'react-redux';
//import { RouteComponentProps } from 'react-router';
//import { ApplicationState } from '../store';
import CounterModule, { CounterState } from '../store/Counter';
import { useDispatch, useSelector } from "react-redux";
/*
 * カウンター画面の表示
 */

//// Reduxの機能
//// Reduxで保持する値、メソッド、ルーティング設定を組み合わせる
//// CounterStateはinterface、actionCreatorsはメソッドの列挙
//type CounterProps =
//    CounterModule.CounterState & // count
//    typeof CounterModule.actions;    // URLにパラメータがある場合は{userId: string}のように引数を書く

// 上で作成したCounterPropsを使用してクラスを定義
export default class Counter extends React.PureComponent{   // このように引数にtype指定するとthis.propsでアクセスできる

    public render() {
        // dispatch の取得
        const dispatch = useDispatch();
        // state の取得
        const counter = useSelector((state: CounterState) => state.count);  // TODO:多分CounterStateをexportするのは正しくないので確認すること

        // ハンドラーを作成
        const increment = () => dispatch(CounterModule.actions.increment);
        const decrement = () => dispatch(CounterModule.actions.decrement);
        const test = () => dispatch(CounterModule.actions.test);

        return (
            <React.Fragment>
                <h1>カウンター</h1>
                <p>これは、Reactコンポーネントの簡単な例です。</p>

                <p>現在のカウント: <strong>{counter}</strong></p>

                <button type="button" className="btn btn-primary btn-lg" onClick={() => { increment(); }}>増やす</button>
                <button type="button" className="btn btn-primary btn-lg" onClick={() => { decrement(); }}>減らす</button>
            </React.Fragment>
        );
    }
};

//// connect関数：ReactコンポーネントをRedux storeに接続します。
//// ※Reduxを使用する場合、Reactとstoreは分断されているためにComponentは値の取得と変更が行えない。そのためにconnect関数が必要。
//export default connect(
//    // 接続するstore情報を書く
//    (state: ApplicationState) => state.counter,    // ApplicationStateはindex.tsで定義している全画面共有の状態から、CounterStateを持ってくる。propsに入れて子コンポーネントに渡す。
//    CounterStore.actionCreators // dispatchを呼び出す関数をpropsに入れて子コンポーネントに渡す
//)(Counter);
//// こうすることで、this.props.increment();でActionが呼び出される