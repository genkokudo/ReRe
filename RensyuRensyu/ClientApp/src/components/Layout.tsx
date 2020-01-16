import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
/*
 * 画面レイアウトの定義
 * NavMenu(NavMenu.tsx)と本体部分
 * App.tsxから呼び出して使用する
 */
export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <NavMenu/>
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
);
