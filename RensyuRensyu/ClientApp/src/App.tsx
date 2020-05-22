import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import NazoMap from './components/leaflet/NazoMap';
import Special from './components/Special';
import ListCrud from './components/master/crud/List';
import ListReportRefProbability from './components/master/reportRefProbability/List';
import CreateCrud from './components/master/crud/Create';
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import './leaflet.css'  // ライブラリ付属のCSSを読み込んでから、本プロジェクトのカスタムCSSを読み込む
import './custom.css'
import NazoChart from './components/chart/NazoChart';

/**
 * index.tsxから呼び出される
 * ここでデフォルトの画面表示を設定する
 * 現在はLayout.tsxを呼び出すのみ
 * ルーティングも設定する
 */
export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/nazo-chart' component={NazoChart} />
        <Route path='/nazo-map' component={NazoMap} />
        <Route path='/special' render={props => <Special aaaa={34} {...props} />} />
        <Route exact path='/crud' component={ListCrud} />
        <Route exact path='/reportRefProbability' component={ListReportRefProbability} />
        <Route path='/crud/create' component={CreateCrud} />
    </Layout>
);