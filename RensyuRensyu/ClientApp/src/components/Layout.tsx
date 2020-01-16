import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
/*
 * ��ʃ��C�A�E�g�̒�`
 * NavMenu(NavMenu.tsx)�Ɩ{�̕���
 * App.tsx����Ăяo���Ďg�p����
 */
export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <NavMenu/>
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
);
