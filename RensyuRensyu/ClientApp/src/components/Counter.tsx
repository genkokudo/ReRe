import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CounterModule from "../store/Counter";

// 引数の定義
interface CounterProps {
    aaaa: number;
    bbbb?: string;  // 必須でない場合は?を付ける
}

/*
 * △△画面の表示
 * ↓呼び方
 * <Route path='/counter34' render={props => <Counter aaaa={34} {...props} />}/>
 */
const Counter = (props: CounterProps) => {    // この引数を使いたい
    // useDispatch で store に紐付いた dispatch が取得できます。
    const dispatch = useDispatch();

    // useSelector で store の state が取得できます。
    const counter = useSelector((state: any) => state.counter.count);   // counterはStoreに登録したreducerの名前

    // 引数の値をdispatchの関数に送って初期値を設定
    if (props.aaaa) {
        dispatch(CounterModule.actions.setCount(props.aaaa));
    } else {
        dispatch(CounterModule.actions.setCount(100));
    }

    return (
        <React.Fragment>
            <p> count: {counter} </p>
            {/* 引数の数は、reducersの関数の引数で決まります。 */}
            <button onClick={() => dispatch(CounterModule.actions.increment())}>increment</button>
            <button onClick={() => dispatch(CounterModule.actions.decrement(1))}>decrement</button>
        </React.Fragment>
    );
};

export default Counter;


