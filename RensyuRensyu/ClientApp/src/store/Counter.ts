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

