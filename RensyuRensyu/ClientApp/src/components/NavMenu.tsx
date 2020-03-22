import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'; // これでBootStrapのような見た目にできる
import { Link } from 'react-router-dom';
import './NavMenu.css'; // CSSを読み込める

/**
 * 画面上部のNavMenuを定義する
 */
const NavMenu = () => {
    // ハンバーガーメニューのトグル
    const [isOpen, setIsOpen] = React.useState(false);    // フィールド名、セッター名、初期値
    // 描画処理
    return (
        <Navbar className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
            <Container fluid={true}>
                <NavbarBrand href="/">CMMP.net</NavbarBrand>
                {/* 小さい画面の時ハンバーガーメニュー表示 */}
                <NavbarToggler onClick={() => { setIsOpen(!isOpen); }} className="mr-2" />
                <Collapse className="d-sm-inline-flex" isOpen={isOpen} navbar>
                    <ul className="navbar-nav flex-grow">
                        {/* toでどのtsxコンポーネントに飛ぶかは、App.tsxで設定する。 */}
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/nazo-map">NazoMap</NavLink>
                        </NavItem>
                        {/* 管理者のみ表示 */}
                        <NavItem>
                            <NavLink tag={Link} className="" to="/react/user-register-index">ユーザ管理</NavLink>
                        </NavItem>
                    </ul>
                    {/* TODO:うまくいかない、あとで。
                    <form className="form-inline my-2 my-lg-0 no-ajax" id="LogoutForm" method="post" asp-controller="Logout" asp-action="Index">
                        <button className="btn btn-outline-light my-2 my-sm-0" type="submit"><i className="fas fa-sign-out-alt"></i> ログオフ</button>
                    </form> */}
                </Collapse>
            </Container>
        </Navbar>
    );
};

export default NavMenu;
