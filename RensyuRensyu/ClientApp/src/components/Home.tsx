import * as React from 'react';
import { connect } from 'react-redux';

// 単純に固定のHTMLを返す例
// この定義をexportすることで、SPAの部分表示にできる
const Home = () => (
    // 普通にHTMLを書く
    <div>
        <h1>Hello, work!</h1>
    </div>
);

// 上で定義した表示をexportして外から呼び出す
export default connect()(Home);
