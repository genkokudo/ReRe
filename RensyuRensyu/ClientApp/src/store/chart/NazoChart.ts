import { Action, Reducer } from 'redux';

//// -------- STATE --------
///**
// * メニューの状態
// */
//export interface NazoChartState {
//    isOpen: boolean;    // ～～の状態
//    count: number;    // ～～の状態
//    name: string;    // ～～の状態
//}

//// -------- ACTIONS --------
///**
// * ～～する処理
// */
//export interface ToggleAaaaAction {
//    type: 'TOGGLE_AAAA'
//    isOpen: boolean;
//}

///**
// * △△する処理
// */
//export interface ToggleBbbbAction { type: 'TOGGLE_BBBB' }

///**
// * 存在する処理の列挙です。
// */
//export type KnownAction = ToggleAaaaAction | ToggleBbbbAction;

//// -------- ACTION CREATORS --------
///**
// * Componentに公開される関数です。
// */
//export const actionCreators = {
//    toggleAaaa: () => ({ type: 'TOGGLE_AAAA' } as ToggleAaaaAction),
//    toggleBbbb: () => ({ type: 'TOGGLE_BBBB' } as ToggleBbbbAction)
//};

//// -------- REDUCER --------
///**
// * 指定された状態とアクションに対して、新しい状態を返します。
// */
//export const reducer: Reducer<NazoChartState> = (state: NazoChartState | undefined, incomingAction: Action): NazoChartState => {
//    // 初期状態
//    if (state === undefined) {
//        return { isOpen: false, count: 0, name: 'aaaa' };
//    }

//    // 処理内容
//    const action = incomingAction as KnownAction;
//    switch (action.type) {
//        case 'TOGGLE_AAAA':
//            return { isOpen: action.isOpen, count: 0, name: 'aaaa' };
//        case 'TOGGLE_BBBB':
//            return { isOpen: !state.isOpen, count: 1, name: 'bbbb' };
//        default:
//            return state;
//    }
//};