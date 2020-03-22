import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import App from './App';
import setupStore from './store/setupStore';

// font-awesomeを使う
import { library } from '@fortawesome/fontawesome-svg-core'; //fontawesomeのコアファイル
import { fab } from '@fortawesome/free-brands-svg-icons'; //fontawesomeのbrandアイコンのインポート
import { fas } from '@fortawesome/free-solid-svg-icons'; //fontawesomeのsolidアイコンのインポート
import { far } from '@fortawesome/free-regular-svg-icons'; //fontawesomeのregularアイコンのインポート
library.add(fab, fas, far); //他のコンポーネントから簡単に呼び出せるようにするための登録処理

// Reduxストアで使用するブラウザHistoryを作成します
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;    // public urlを取得
const history = createBrowserHistory({ basename: baseUrl });

// アプリケーション全体のストアインスタンスを取得し、利用可能な場合はサーバーから状態を事前入力します。
// どのReducerを使用するかなどの設定を行い、そのStoreを使用する
const store = setupStore(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    // index.htmlのrootを取得してそこに描画する。
    document.getElementById('root')
);

// サービスワーカーを登録
// 本番環境でローカルキャッシュからアセットを提供するようになり、アプリの読み込みが速くなり、オフライン機能が提供されるようになる。
//registerServiceWorker();
