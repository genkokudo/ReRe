import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.css'

/**
 * ここでデフォルトの画面表示を設定する
 * 現在はLayout.tsxを呼び出すのみ
 * ルーティングも設定する
 */
export default () => (
    // Routeタグを使って、tsxコンポーネントでルーティングアドレスと遷移先を指定する。
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);
