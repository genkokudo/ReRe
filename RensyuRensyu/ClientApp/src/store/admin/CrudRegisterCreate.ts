import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ----- state -----
export interface CrudRegisterCreateState {
    companies: SelectListItem[];
    authorities: SelectListItem[];

    id: string;
    password: string;
    companyId: string;
    authority: string[];
}

// 補助データ
interface SelectListItem {
    text: string;
    value: string;
}

// 初期値
const CrudRegisterCreateInitialState: CrudRegisterCreateState = {
    companies: [],
    authorities: [],

    id: '',
    password: '',
    companyId: '',
    authority: []
};

// createSlice() の中では、stateの更新を行っても良い（他ではだめ）
// 同じ画面で同じhooksを複数使用する場合、このSliceを複数にすること。同じStateを呼んでしまい、エラーになるため。
export let CrudRegisterCreateModule = createSlice({
    name: "CrudRegisterCreate",
    initialState: CrudRegisterCreateInitialState,
    reducers:   // 処理の定義
    {
        // Fetchしたデータをstateに反映させる
        setData: (state, action: PayloadAction<CrudRegisterCreateState>) => {
            if (action.payload) {
                state.companies = action.payload.companies;
                state.authorities = action.payload.authorities;
            }
        },
        postData: (state) => {
            var formData = new FormData();
            formData.append('id', state.id);
            formData.append('password', state.password);
            formData.append('companyId', state.companyId);
            state.authority.forEach((value) => {
                formData.append('authorities', value);
            });
            //formData.append('Ids', 2);
            //formData.append('Addresses', '住所B');

            fetch('/CrudRegister/PostCrudRegisterCreate', {
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
        },
        changeId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        changePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        changeCompanyId: (state, action: PayloadAction<string>) => {
            state.companyId = action.payload;
        },
        changeAuthority: (state, action: PayloadAction<any>) => {
            if (action.payload.checked) {
                state.authority.push(action.payload.value);
            } else {
                let index = state.authority.findIndex((v) => v === action.payload.value);
                state.authority.splice(index, 1);
            }
        }
    }
});