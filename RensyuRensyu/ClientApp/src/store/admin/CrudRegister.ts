import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// state
export interface CrudRegisterState {
    // もし、interfaceの配列を使用する場合：正しく読めないので、JSON.parse(JSON.stringify(datasets))で読み直して使用すること
    Cruds: Crud[];
}

// 補助データ
interface Crud {
    CrudId: number;
    name: number;
    CrudCompanyName: string;
    CrudAuthoritiesName: string;
    isDeleted: boolean;
}

// 初期値
const CrudRegisterInitialState: CrudRegisterState = {
    Cruds: []
};

// createSlice() の中では、stateの更新を行っても良い（他ではだめ）
// 同じ画面で同じhooksを複数使用する場合、このSliceを複数にすること。同じStateを呼んでしまい、エラーになるため。
export let CrudRegisterModule = createSlice({
    name: "CrudRegister",
    initialState: CrudRegisterInitialState,
    reducers:   // 処理の定義
    {
        // Fetchしたデータをstateに反映させる
        setData: (state, action: PayloadAction<CrudRegisterState>) => {
            if (action.payload) {
                // stateに代入する方法では更新できない
                //state = action.payload;

                // CrudRegisterStateにdataという構造体があるとすると、以下のようにセット可能。
                // state.data = payload.data
                // ただし上記の場合、useSelector((state: any) => state.CrudRegister.data);は可能だが、
                // useSelector((state: any) => state.CrudRegister.data.label);は不可能。
                // セレクタで取得してからlabelにアクセスすることは可能。
                // どっちが綺麗かの問題なので、好きな方を選択する。

                // こうやって、1つずつフィールドを転記すると確実
                //state.label = action.payload.label;
                //state.cost = action.payload.cost;

                // または、丸ごとreturnする（APIと関係ないフィールドが無い場合のみ）
                return action.payload;
            }
        }

    }
});