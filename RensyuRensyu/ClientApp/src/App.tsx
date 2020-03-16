import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import NazoMap from './components/leaflet/NazoMap';
import Special from './components/Special';

//import FetchData from './components/FetchData';
//import NazoChart from './components/chart/NazoChart';
//import NazoMap from './components/leaflet/NazoMap';

import 'leaflet/dist/leaflet.css'
import './leaflet.css'  // ライブラリ付属のCSSを読み込んでから、本プロジェクトのカスタムCSSを読み込む

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
        <Route path='/counter34' render={props => <Counter aaaa={34} {...props} />} />
        <Route path='/nazo-map' component={NazoMap} />
        <Route path='/special' render={props => <Special aaaa={34} {...props} />} />
        {/*
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/nazo-chart' component={NazoChart} />
        <Route path='/nazo-map' component={NazoMap} />*/}
    </Layout>
);