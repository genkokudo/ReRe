import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as CounterStore from '../store/Counter';

// CounterStore.CounterStateとCounterStore.actionCreatorsを合体させてるみたい
// CounterStateはinterface、actionCreatorsはなんかメソッドの集まり
type CounterProps =
    CounterStore.CounterState &
    typeof CounterStore.actionCreators &
    RouteComponentProps<{}>;
// CounterStateは状態を表しており、ここではクリックした回数となる。これを合体したactionCreatorsでカウントアップ。
// Reduxは状態を更新する場合、常に新しい状態を返す。上書きではない。

// 上で作成したCounterPropsを使用してクラスを定義
class Counter extends React.PureComponent<CounterProps> {
    // どうやらimport先で書かなくてもクラスをexportした場合はrender()を呼ぶことになってるらしい。
    // this.propsにはCounterPropsが入ってるので、その中のCounterStore.actionCreatorsとかに定義されたものが呼べる
    // this.props.countはCounterStore.CounterStateに入っているぞ
    public render() {
        return (
            <React.Fragment>
                <h1>Counter</h1>

                <p>これは、Reactコンポーネントの簡単な例です。</p>

                <p aria-live="polite">現在のカウント: <strong>{this.props.count}</strong></p>

                <button type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => { this.props.increment(); }}>
                    増やす
                </button>
            </React.Fragment>
        );
    }
};

// HOMEと違って、Componentを継承したクラスを返す
// 画面表示する値を状態に代入する所を引数に設定する
export default connect( // どうやらindex.tsで覚えているApplicationStateの値を渡すらしい。ここに現在のカウンタを持たせている。
    (state: ApplicationState) => state.counter, // どの状態プロパティをコンポーネントの小道具にマージするかを選択します
    CounterStore.actionCreators // コンポーネントの小道具にマージするアクション作成者を選択します
)(Counter);
