import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CounterState } from "../store/Counter";
import CounterModule from "../store/Counter";
/*
 * △△画面の表示
 */
const Counter = () => {
    // useDispatch で store に紐付いた dispatch が取得できます。
    const dispatch = useDispatch();

    // useSelector で store の state が取得できます。
    const counter = useSelector((state: any) => state.counter.count);   // counterはStoreに登録したreducerの名前
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







//// --------------- Counter.tsx --------------- 
//// Redux不使用パターン
//import React, { useState, useEffect } from 'react'

///*
// * △△画面の表示
// */
//const Counter = (props: CounterProps) => {
//    // 注意：Hooksは必ず関数の中のトップレベルに書くこと

//    // React本体に関数コンポーネント専用の保存領域を作成してもらい、そこにあるデータを読み書きできる
//    const [count, setCount] = useState(props.initialCount);    // フィールド名、セッター名、初期値

//    // レンダリングの後に処理を動作させることができます（レンダリングの前はuseLayoutEffect）
//    useEffect(() => {
//        console.log('hello useEffect');
//        // returnを使うと、クリーンアップ関数を登録できる
//        //const timerId = setInterval(() => setTime(new Date().getTime()), 1000);
//        //return () => clearInterval(timerId);
//    }, []); // この第2引数にcountをセットすると、count変更時に再びRenderされる

//    // 任意の関数
//    const helloWork = () => {
//        console.log('Hello Work');
//        return 'aaaa';
//    }

//    return (
//        <React.Fragment>
//            <p>{helloWork()}</p>
//            <p>You clicked {count} times</p>
//            <button onClick={() => setCount(count + 1)}>
//                Click me
//            </button>
//        </React.Fragment>
//    );

//    // 他に値を送るための入れ物を使う場合は useContext を使用する
//    // コストの大きい計算結果をキャッシュする場合は、useMemoを使用する
//    // const calcResult = useMemo(() => expensiveFunc(), []);
//    // 関数をキャッシュする場合はuseCallbackを使う
//    // const onClick = useCallback(() => alert('Hi!'), []);
//    // DOMから値を取りたい場合はuseRefを使用する
//};

//// 引数の型を指定、いらなかったら消す
//type CounterProps = {
//    initialCount: number;
//}

//// デフォルト値
//Counter.defaultProps = {
//    initialCount: 100
//};

//export default Counter;

//// --------------- NavMenu.tsx --------------- 
////<NavItem>
////    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
////</NavItem>

