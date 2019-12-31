import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

// �S�̂�css�͂����Ŏw�肷��΂悢
import './custom.css'

export default () => (
    // Route�^�O���g���āAtsx�R���|�[�l���g�őJ�ڐ���w�肷��B
    // ����ƁA�ȉ��̂悤�ɂ��đJ�ڂł��郊���N���쐬�ł���B
    // <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);
