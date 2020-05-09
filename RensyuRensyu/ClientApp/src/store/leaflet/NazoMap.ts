import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 更に、独自のデータ型をinterfaceで作成し、stateに持たせても良い。

// state
export interface NazoMapState {
    count: number;
    is: boolean;
}

// 初期値
const nazoMapInitialState: NazoMapState = {
    count: 1,
    is: true
};

// createSlice() の中では、stateの更新を行っても良い（他ではだめ）
const NazoMapModule = createSlice({
    name: 'nazoMap',
    initialState: nazoMapInitialState,
    reducers:   // 処理の定義
    {
        increment: (state) => { state.count++; },           // 第2引数を省略すると引数無しで呼び出せる
        decrement: (state, action) => { state.count--; },
        test: (state, action: PayloadAction<number>) => {   // PayloadActionで引数の型を指定する
            state.count = action.payload
        },
        // 線の追加
        createLines: (state, action: PayloadAction<number>) => {
            state.is = !state.is;
            alert(state.is);
        }
        //// 行を追加する
        //addLine: (state, action: PayloadAction<ListState>) => {
        //    return state;
        //},
    }
});

export default NazoMapModule;

