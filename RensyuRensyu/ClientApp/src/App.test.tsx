import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// クラッシュせずにレンダリングする
it('renders without crashing', () => {
    const storeFake = (state: any) => ({
        default: () => {},
        subscribe: () => {},
        dispatch: () => {},
        getState: () => ({ ...state })
    });
    const store = storeFake({}) as any;

    ReactDOM.render(
        <Provider store={store}>
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        </Provider>, document.createElement('div'));
});
//Providerの目的は2つ
//1. Reactコンポーネント内でreact - reduxのconnect()関数を使えるようにすること
//2. ラップしたコンポーネントにstore情報を渡すこと