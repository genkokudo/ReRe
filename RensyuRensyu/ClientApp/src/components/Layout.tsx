import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
/*
 * 画面レイアウトの定義
 * NavMenu(NavMenu.tsx)と本体部分
 * App.tsxから呼び出して使用する
 * 引数のchildrenには、App.tsxで設定した子画面情報のリストが格納されている
 */
export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        {/* 画面いっぱいにする場合は、fluid={true} を付ける */}
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
);