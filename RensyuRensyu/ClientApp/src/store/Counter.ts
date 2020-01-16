import { Action, Reducer } from 'redux';

// Reduxを使った方法。各関数とStateを定義してしまう。

// -----------------
// STATE - Reduxストアで保持されるデータのタイプを定義します。

export interface CounterState {
    count: number;
}

// -----------------
// ACTIONS - これらは、状態遷移のシリアル化可能な（したがって再生可能な）説明です。
// それらには副作用はありません。彼らは起こることを説明するだけです。
// シリアル化/逆シリアル化の後でも動作する型検出のために@typeNameとisActionTypeを使用します。

export interface IncrementCountAction { type: 'INCREMENT_COUNT' }
export interface DecrementCountAction { type: 'DECREMENT_COUNT' }

// 「差別化された共用体」型を宣言します。これにより、「type」プロパティへのすべての参照に次のいずれかが含まれることが保証されます。
// 宣言された型文字列（他の任意の文字列ではありません）。
export type KnownAction = IncrementCountAction | DecrementCountAction;

// ----------------
// ACTION CREATORS-これらは、状態遷移をトリガーするUIコンポーネントに公開される関数です。
// 状態を直接変化させることはありませんが、外部の副作用（データの読み込みなど）を引き起こす可能性があります。

export const actionCreators = {
    increment: () => ({ type: 'INCREMENT_COUNT' } as IncrementCountAction),
    decrement: () => ({ type: 'DECREMENT_COUNT' } as DecrementCountAction)
};

// ----------------
// REDUCER - 指定された状態とアクションに対して、新しい状態を返します。タイムトラベルをサポートするために、これは古い状態を変化させてはなりません。

// Reduxは状態を更新する場合、常に新しい状態を作成して返す。上書きではない。
export const reducer: Reducer<CounterState> = (state: CounterState | undefined, incomingAction: Action): CounterState => {
    // 初期状態：index.tsのCounterStateの初期値はundefined、この時は0を表示する
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
