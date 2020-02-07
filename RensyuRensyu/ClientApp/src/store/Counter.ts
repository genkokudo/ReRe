import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 更に、独自のデータ型をinterfaceで作成し、stateに持たせても良い。

// state
export interface CounterState {
    count: number;
}

// 初期値
const counterInitialState: CounterState = {
    count: 1
};

// createSlice() で actions と reducers を一気に生成する
// createSlice() の中では、stateの更新を行っても良い（他ではだめ）
const CounterModule = createSlice({
    name: "counter",    // 名前、そんなに重要じゃない
    initialState: counterInitialState,  // 初期値
    reducers:   // 処理の定義
    {
        increment: (state, action) => { state.count++; },
        decrement: (state, action) => { state.count--; },
        test: (state, action: PayloadAction<number>) => {   // PayloadActionで引数の型を指定する
            state.count = action.payload    // createSlice内なのでstate書き換えOK
        },
    }
});

export default CounterModule;

//import { Action, Reducer } from 'redux';

//// Reduxを使った方法。各関数とStateを定義してしまう。

//// -----------------
//// STATE - Reduxストアで保持されるデータのタイプを定義します。

//export interface CounterState {
//    count: number;
//}

//// -----------------
//// ACTIONS - これらは、状態遷移のシリアル化可能な（したがって再生可能な）説明です。
//// それらには副作用はありません。彼らは起こることを説明するだけです。
//// シリアル化/逆シリアル化の後でも動作する型検出のために@typeNameとisActionTypeを使用します。

//// 要するに、メソッドの種類名と引数を定義している。これは引数がない例なので分かりにくい。
//export interface IncrementCountAction { type: 'INCREMENT_COUNT' }
//export interface DecrementCountAction { type: 'DECREMENT_COUNT' }

//// 「差別化された共用体」型を宣言します。これにより、「type」プロパティへのすべての参照に次のいずれかが含まれることが保証されます。
//// 宣言された型文字列（他の任意の文字列ではありません）。
//export type KnownAction = IncrementCountAction | DecrementCountAction;

//// ----------------
//// ACTION CREATORS-これらは、状態遷移をトリガーするUIコンポーネントに公開される関数です。
//// 状態を直接変化させることはありませんが、外部の副作用（データの読み込みなど）を引き起こす可能性があります。

//export const actionCreators = {
//    increment: () => ({ type: 'INCREMENT_COUNT' } as IncrementCountAction),
//    decrement: () => ({ type: 'DECREMENT_COUNT' } as DecrementCountAction)
//};

//// ----------------
//// REDUCER - 指定された状態とアクションに対して、新しい状態を返します。タイムトラベルをサポートするために、これは古い状態を変化させてはなりません。

//// Reduxは状態を更新する場合、常に新しい状態を作成して返す。上書きではない。
//export const reducer: Reducer<CounterState> = (state: CounterState | undefined, incomingAction: Action): CounterState => {
//    // 初期状態：index.tsのCounterStateの初期値はundefined、この時は0を表示する
//    if (state === undefined) {
//        return { count: 0 };
//    }

//    const action = incomingAction as KnownAction;
//    switch (action.type) {
//        case 'INCREMENT_COUNT':
//            return { count: state.count + 1 };
//        case 'DECREMENT_COUNT':
//            return { count: state.count - 1 };
//        default:
//            return state;
//    }
//};
