import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Utils from "../../../Utils";

// state
export interface ListState {
    reportRefProbabilities: ReportRefProbability[];
    message: string;  // 正常メッセージ
    error: string;  // エラーメッセージ

    isEdited: boolean;  // この画面で編集していたらtrue
    formData: FormData; // サーバ送信のためのデータ
    postTrigger: number;// この値が変化したらPostする
}

// 補助データ
interface ReportRefProbability {
    reportRefProbabilityId: number;
    category: string;
    condition: string;
    probability: number;
    increaseProbability: number;
    order: number;
    version: number;
    updatedBy: string;
    updatedDate: string;
    isDeleted: boolean;  // この画面で編集したか
    isEditMode: boolean;  // 現在編集中
    isEdited: boolean;  // この画面で編集したか
    isNgInput: boolean;  // 必須入力などで入力NG
    errorMessage: string;  // NGメッセージ
}

// 初期値
const ListInitialState: ListState = {
    reportRefProbabilities: [],
    message: '',
    error: '',

    isEdited: false,  // この画面でいずれかの行を編集したか
    formData: new FormData(),
    postTrigger: 0
};

// 送信可能か判定する
// 入力NGがある場合はfalse
function isEditedState(state: ListState) {
    if (state.reportRefProbabilities.find(data => data.isNgInput && !data.isDeleted)) {
        state.isEdited = false;
    }
    else if (state.reportRefProbabilities.find(data => isEdited(data))) {
        state.isEdited = true;
    }
    else {
        state.isEdited = false;
    }
}
// 削除:1,編集した:2,編集していないまたはNG:0
function isEdited(data: ReportRefProbability) {
    if (data.isDeleted) {
        return 1;
    } else if (data.isEdited || data.isEditMode) {
        return 2;
    }
    return 0;
}

// createSlice() の中では、stateの更新を行っても良い（他ではだめ）
export let ListReportRefProbabilityModule = createSlice({
    name: "ListReportRefProbability",
    initialState: ListInitialState,
    reducers:   // 処理の定義
    {
        // Fetchしたデータをstateに反映させる
        setData: (state, action: PayloadAction<ListState>) => {
            if (action.payload) {
                state.reportRefProbabilities = action.payload.reportRefProbabilities;
                state.message = action.payload.message;
                state.error = action.payload.error;
                state.isEdited = false;
                state.formData = new FormData();
            }
            return state;
        },
        // 行を追加する
        addLine: (state) => {
            // 表示順の最大+1を設定
            let orders = state.reportRefProbabilities.map(({ order }) => order);
            var max = Math.max(...orders);
            state.reportRefProbabilities.push({
                reportRefProbabilityId: 0, order: max + 1, isDeleted: false, isEditMode: true, isEdited: true
                ,isNgInput: true, errorMessage: '入力がありません', version: 0, updatedBy: '(new)', updatedDate: '(new)', category: '', condition: '', probability: 0, increaseProbability: 0
            });
            isEditedState(state);
            return state;
        },
        // 行を削除する
        removeLine: (state, action: PayloadAction<string>) => {
            state.reportRefProbabilities[Number(action.payload)].isDeleted = !state.reportRefProbabilities[Number(action.payload)].isDeleted;
            isEditedState(state);
            return state;
        },
        // 行を編集する
        editLine: (state, action: PayloadAction<string>) => {
            state.reportRefProbabilities[Number(action.payload)].isEditMode = !state.reportRefProbabilities[Number(action.payload)].isEditMode;
            state.reportRefProbabilities[Number(action.payload)].isEdited = true;
            isEditedState(state);
            return state;
        },
        // 各項目の編集
        editOrder: (state, action: PayloadAction<{ id: string, order: number }>) => {
            state.reportRefProbabilities[Number(action.payload.id)].order = action.payload.order;
            return state;
        },
        editCategory: (state, action: PayloadAction<{ id: string, text: string }>) => {
            state.reportRefProbabilities[Number(action.payload.id)].category = action.payload.text;
            return state;
        },
        editCondition: (state, action: PayloadAction<{ id: string, text: string }>) => {
            state.reportRefProbabilities[Number(action.payload.id)].condition = action.payload.text;
            return state;
        },
        editProbability: (state, action: PayloadAction<{ id: string, text: number }>) => {
            state.reportRefProbabilities[Number(action.payload.id)].isNgInput = false;
            let min = Utils.calcMinValue(6, 2);
            let max = Utils.calcMaxValue(6, 2);
            state = checkNumber(state, Number(action.payload.id), action.payload.text, min, max);
            state.reportRefProbabilities[Number(action.payload.id)].probability = action.payload.text;
            return state;
        },
        editIncreaseProbability: (state, action: PayloadAction<{ id: string, text: number }>) => {
            state.reportRefProbabilities[Number(action.payload.id)].isNgInput = false;
            let min = Utils.calcMinValue(6, 2);
            let max = Utils.calcMaxValue(6, 2);
            state = checkNumber(state, Number(action.payload.id), action.payload.text, min, max);
            state.reportRefProbabilities[Number(action.payload.id)].increaseProbability = action.payload.text;
            return state;
        },
        // サーバに送信するためのFormData作成
        // FormDataを変更するとuseEffectによってサーバにPostされる仕組みにしている。
        makeFormData: (state) => {
            var formData = new FormData();
            state.reportRefProbabilities.forEach(reportRefProbability => {
                formData.append('ids', reportRefProbability.reportRefProbabilityId.toString());
                formData.append('categories', reportRefProbability.category.toString());
                formData.append('conditions', reportRefProbability.condition.toString());
                formData.append('probabilities', reportRefProbability.probability.toString());
                formData.append('increaseProbabilities', reportRefProbability.increaseProbability.toString());
                formData.append('isEdited', isEdited(reportRefProbability).toString());  // 削除:1,編集した:2,編集していない:0
                formData.append('orders', reportRefProbability.order.toString());
                formData.append('versions', reportRefProbability.version.toString());
            });

            state.formData = formData;
            state.postTrigger++;
            return state;
        }

    }
});

// 文字列の入力チェックを行う
function validation(state: ListState, id: number, text: string, list: string[]) {
    let tempText = text.trim();
    let isConfirmed = list.some(data => data.trim() === tempText);
    if (tempText == '') {
        // 必須入力チェック
        state.reportRefProbabilities[id].isNgInput = true;
        state.reportRefProbabilities[id].errorMessage = '入力がありません';
    } else if (isConfirmed) {
        // 重複入力チェック
        state.reportRefProbabilities[id].isNgInput = true;
        state.reportRefProbabilities[id].errorMessage = '他の値と重複しています';
    } else {
        // 異常なし
        state.reportRefProbabilities[id].isNgInput = false;
        state.reportRefProbabilities[id].errorMessage = '';
    }
    // 送信可能か判定する
    isEditedState(state);
    return state;
}

// 数値の入力チェック、重複チェックが必要なもののみ
function validationNumber(state: ListState, id: number, text: number, list: number[]) {
    if (state.reportRefProbabilities[id].isNgInput == false) {
        let tempText = text;
        let isConfirmed = list.some(data => data === tempText);
        if (isConfirmed) {
            // 重複入力チェック
            state.reportRefProbabilities[id].isNgInput = true;
            state.reportRefProbabilities[id].errorMessage = '他の値と重複しています';
        } else {
            // 異常なし
            state.reportRefProbabilities[id].isNgInput = false;
            state.reportRefProbabilities[id].errorMessage = '';
        }
        // 送信可能か判定する
        isEditedState(state);
    }
    return state;
}

// 数値の入力チェック、最大最小チェックが必要なもののみ
function checkNumber(state: ListState, id: number, text: number, min: number, max: number) {
    if (state.reportRefProbabilities[id].isNgInput == false) {
        let tempText = text;
        if (tempText > max) {
            // 最大値チェック
            state.reportRefProbabilities[id].isNgInput = true;
            state.reportRefProbabilities[id].errorMessage = '値は' + max + '以下で入力してください';
        } else if (tempText < min) {
            // 最小値チェック
            state.reportRefProbabilities[id].isNgInput = true;
            state.reportRefProbabilities[id].errorMessage = '値は' + min + '以上で入力してください';
        } else {
            // 異常なし
            state.reportRefProbabilities[id].errorMessage = '';
        }
        // 送信可能か判定する
        isEditedState(state);
    }
    return state;
}
