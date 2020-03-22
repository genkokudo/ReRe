import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import NazoMap from './components/leaflet/NazoMap';
import Special from './components/Special';
import 'leaflet/dist/leaflet.css'
import './leaflet.css'  // ライブラリ付属のCSSを読み込んでから、本プロジェクトのカスタムCSSを読み込む
import './custom.css'

/**
 * index.tsxから呼び出される
 * ここでデフォルトの画面表示を設定する
 * 現在はLayout.tsxを呼び出すのみ
 * ルーティングも設定する
 */
export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/nazo-map' component={NazoMap} />
        <Route path='/special' render={props => <Special aaaa={34} {...props} />} />
    </Layout>
);