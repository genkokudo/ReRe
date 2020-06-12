import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
/*
 * ��ʃ��C�A�E�g�̒�`
 * NavMenu(NavMenu.tsx)�Ɩ{�̕���
 * App.tsx����Ăяo���Ďg�p����
 * ������children�ɂ́AApp.tsx�Őݒ肵���q��ʏ��̃��X�g���i�[����Ă���
 */
export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        {/* ��ʂ����ς��ɂ���ꍇ�́Afluid={true} ��t���� */}
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
);