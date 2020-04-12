import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// state
export interface ListState {
    // もし、interfaceの配列を使用する場合：正しく読めないので、JSON.parse(JSON.stringify(datasets))で読み直して使用すること
    cruds: Crud[];
    aaaa: string;
}

// 補助データ
interface Crud {
    crudId: number;
    name: string;
    companyName: string;
    userAuthorities: string[];
    isDeleted: boolean;  // この画面で編集したか
    isEdited: boolean;  // この画面で編集したか
}

// 初期値
const ListInitialState: ListState = {
    cruds: [],
    aaaa: ''
};

// createSlice() の中では、stateの更新を行っても良い（他ではだめ）
export let ListCrudModule = createSlice({
    name: "ListCrud",
    initialState: ListInitialState,
    reducers:   // 処理の定義
    {
        // Fetchしたデータをstateに反映させる
        setData: (state, action: PayloadAction<ListState>) => {
            // 画面読み込み時に呼ぶので、ここでセットしたstateは書き換えられない
            if (action.payload) {
                state.cruds = action.payload.cruds
            }
            return state;
        },
        // 行を追加する
        addLine: (state, action: PayloadAction<ListState>) => {
            return state;
        },
        // 行を削除する
        removeLine: (state, action: PayloadAction<string>) => {
            state.cruds[Number(action.payload)].isDeleted = true;
            state.aaaa = action.payload;
            return state;
        },
        // 現在のテーブルをサーバに反映させる
        submitData: (state, action: PayloadAction<ListState>) => {
            // TODO:isEditedのみ追加すること
            var formData = new FormData();
            state.cruds.forEach(crud => {
                formData.append('ids', crud.crudId.toString());
                formData.append('names', crud.name);
                formData.append('isDeleteds', crud.isDeleted.toString());
            });

            fetch('/Crud/PostListTable', {
                method: 'post',
                body: formData,
                credentials: 'include'
            }).then(function (response) {
                if (response.status !== 200) {
                    alert('サーバ処理で何か失敗したようです');
                }
                // JSONメッセージを取り出す
                response.json().then(function (data) {
                    // 成功時の処理
                    alert(data.message);
                }).catch(function (err) {
                    alert(`レスポンスデータはありませんでした: ${err}`);
                });
            }).catch(function (err) {
                alert(`error: ${err}`);
            });

            return state;
        }

    }
});