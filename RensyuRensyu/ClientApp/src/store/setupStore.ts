//import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
//import { ApplicationState, reducers } from './';
import { reducers } from './';

///**
// * Redux�ň���Store��ݒ肷��Aindex.ts�ŌĂяo����React(Redux)�Ŏg�p����
// * @param history
// * @param initialState
// */
//export default function configureStore(history: History, initialState?: ApplicationState) {
//    // �g�p����~�h���E�F�A�̗�
//    const middleware = [
//        thunk,  // ��������֐������d�g��
//        routerMiddleware(history)   // ����path, hash�Ȃǂ��ȒP�Ɏ擾�ł���悤�ɂ���d�g�݁A����page�ւ̃i�r�Q�[�g������d�g��
//    ];

//    // index.ts�Œ�`����reducers���g�p����
//    // reducer:�������Ə�������`����Ă���AState�Ə�������n�����ƂŐV����State���쐬����
//    const rootReducer = combineReducers({
//        ...reducers,
//        router: connectRouter(history)
//    });

//    // �悭�킩��Ȃ��c
//    const enhancers = [];
//    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
//    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
//        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
//    }

//    // �ݒ�Ɋ�Â���State���쐬����
//    return createStore(
//        rootReducer,
//        initialState,
//        compose(applyMiddleware(...middleware), ...enhancers)
//    );
//}

import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// store�̍쐬
export const setupStore = (history: History) => {
    const middlewares = [
        ...getDefaultMiddleware(),  // toolkit�̃f�t�H���g�~�h���E�F�A�F��Ԃ̔�r�Ȃǂ��s���炵��
        thunk,  // ��������֐������d�g��
        routerMiddleware(history)   // ����path, hash�Ȃǂ��ȒP�Ɏ擾�ł���悤�ɂ���d�g�݁A����page�ւ̃i�r�Q�[�g������d�g��
    ];

    // �{����index.ts�ɏ���
    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)  // Route�g���ꍇ�͂��ꂪ�����ƃ_��
    });

    const store = configureStore({
        reducer: rootReducer,
        middleware: middlewares
    });

    return store;
}