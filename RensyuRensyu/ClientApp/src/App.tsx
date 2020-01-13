import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

// 全体のcssはここで指定すればよい
import './custom.css'

export default () => (
    // Routeタグを使って、tsxコンポーネントで遷移先を指定する。
    // すると、以下のようにして遷移できるリンクを作成できる。
    // <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);
