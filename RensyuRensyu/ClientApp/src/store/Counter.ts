import { Action, Reducer } from 'redux';

// -----------------
// STATE - Reduxストアで保持されるデータのタイプを定義します。

export interface CounterState {
    count: number;
}

// -----------------
// ACTIONS - これらは、状態遷移のシリアル化可能な（したがって再生可能な）説明です。
// それらには副作用はありません。彼らは起こることを説明するだけです。
// シリアル化/逆シリアル化の後でも動作する型検出のために@typeNameとisActionTypeを使用します。

// ここのinterfaceは特に余所で参照されているわけではない。単純な処理だからか？
export interface IncrementCountAction { type: 'INCREMENT_COUNT' }
export interface DecrementCountAction { type: 'DECREMENT_COUNT' }

// 「差別化された共用体」型を宣言します。これにより、「type」プロパティへのすべての参照に次のいずれかが含まれることが保証されます。
// 宣言された型文字列（他の任意の文字列ではありません）。
export type KnownAction = IncrementCountAction | DecrementCountAction;

// ----------------
// アクションクリエーター-これらは、状態遷移をトリガーするUIコンポーネントに公開される関数です。
// 状態を直接変化させることはありませんが、外部の副作用（データの読み込みなど）を引き起こす可能性があります。

export const actionCreators = {
    increment: () => ({ type: 'INCREMENT_COUNT' } as IncrementCountAction),
    decrement: () => ({ type: 'DECREMENT_COUNT' } as DecrementCountAction)
};

// ----------------
// REDUCER - 指定された状態とアクションに対して、新しい状態を返します。タイムトラベルをサポートするために、これは古い状態を変化させてはなりません。
// （※推測）reducerとstateはまとめてindex.tsで列挙されており、インジェクションのような仕組みで取り出して使われている？
export const reducer: Reducer<CounterState> = (state: CounterState | undefined, incomingAction: Action): CounterState => {
    if (state === undefined) {
        return { count: 0 };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'INCREMENT_COUNT':
            return { count: state.count + 1 };
        case 'DECREMENT_COUNT':
            return { count: state.count - 1 };
        default:
            return state;
    }
};
