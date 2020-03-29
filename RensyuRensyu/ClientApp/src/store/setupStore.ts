import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { reducers } from './';
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

/**
 * Redux�ň���Store��ݒ肷��Aindex.ts�ŌĂяo����React(Redux)�Ŏg�p����
 * @param history
 * @param initialState
 */
export default function setupStore(history: History) {
    const middlewares = [
        ...getDefaultMiddleware(),  // toolkit�̃f�t�H���g�~�h���E�F�A�F��Ԃ̔�r�Ȃǂ��s���炵��
        thunk,  // ��������֐������d�g��
        routerMiddleware(history)   // ����path, hash�Ȃǂ��ȒP�Ɏ擾�ł���悤�ɂ���d�g�݁A����page�ւ̃i�r�Q�[�g������d�g��
    ];

    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)
    });

    const store = configureStore({
        reducer: rootReducer,
        middleware: middlewares
    });

    return store;
}

// TODO: �S��hooks�ŏ����ꍇ�Aindex.ts��ApplicationState, AppThunkAction�͕s�v�B