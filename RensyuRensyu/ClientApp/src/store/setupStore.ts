//import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
//import { ApplicationState, reducers } from './';
import { reducers } from './';

///**
// * Reduxで扱うStoreを設定する、index.tsで呼び出してReact(Redux)で使用する
// * @param history
// * @param initialState
// */
//export default function configureStore(history: History, initialState?: ApplicationState) {
//    // 使用するミドルウェアの列挙
//    const middleware = [
//        thunk,  // 引数から関数を作る仕組み
//        routerMiddleware(history)   // 今のpath, hashなどを簡単に取得できるようにする仕組み、他のpageへのナビゲートをする仕組み
//    ];

//    // index.tsで定義したreducersを使用する
//    // reducer:処理名と処理が定義されており、Stateと処理名を渡すことで新しいStateを作成する
//    const rootReducer = combineReducers({
//        ...reducers,
//        router: connectRouter(history)
//    });

//    // よくわからない…
//    const enhancers = [];
//    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
//    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
//        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
//    }

//    // 設定に基づいたStateを作成する
//    return createStore(
//        rootReducer,
//        initialState,
//        compose(applyMiddleware(...middleware), ...enhancers)
//    );
//}

import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// storeの作成
export const setupStore = (history: History) => {
    const middlewares = [
        ...getDefaultMiddleware(),  // toolkitのデフォルトミドルウェア：状態の比較などを行うらしい
        thunk,  // 引数から関数を作る仕組み
        routerMiddleware(history)   // 今のpath, hashなどを簡単に取得できるようにする仕組み、他のpageへのナビゲートをする仕組み
    ];

    // 本当はindex.tsに書く
    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)  // Route使う場合はこれが無いとダメ
    });

    const store = configureStore({
        reducer: rootReducer,
        middleware: middlewares
    });

    return store;
}