import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { ApplicationState, reducers } from './';

/**
 * Redux�ň���Store��ݒ肷��Aindex.ts�ŌĂяo����React(Redux)�Ŏg�p����
 * @param history
 * @param initialState
 */
export default function configureStore(history: History, initialState?: ApplicationState) {
    // �g�p����~�h���E�F�A�̗�
    const middleware = [
        thunk,  // ��������֐������d�g��
        routerMiddleware(history)   // ����path, hash�Ȃǂ��ȒP�Ɏ擾�ł���悤�ɂ���d�g�݁A����page�ւ̃i�r�Q�[�g������d�g��
    ];

    // index.ts�Œ�`����reducers���g�p����
    // reducer:�������Ə�������`����Ă���AState�Ə�������n�����ƂŐV����State���쐬����
    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)
    });

    // �悭�킩��Ȃ��c
    const enhancers = [];
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }

    // �ݒ�Ɋ�Â���State���쐬����
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
