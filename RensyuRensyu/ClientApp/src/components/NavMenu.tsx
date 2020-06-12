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

    // 現在のURL
    // 画面変えても反映されないね。何で？
    let url = window.location.href;

    // 描画処理
    return (
        <Navbar className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
            <Container fluid={true}>
                <NavbarBrand href="/">ReRe</NavbarBrand>
                {/* 小さい画面の時ハンバーガーメニュー表示 */}
                <NavbarToggler onClick={() => { setIsOpen(!isOpen); }} className="mr-2" />
                <Collapse className="d-sm-inline-flex" isOpen={isOpen} navbar>
                    <ul className="navbar-nav flex-grow">
                        {/* toでどのtsxコンポーネントに飛ぶかは、App.tsxで設定する。 */}
                        <NavItem>
                            <NavLink tag={Link} className={url.indexOf('/nazo-map') != -1 ? 'active' : ''} to="/nazo-map">NazoMap</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className={url.indexOf('/nazo-chart') != -1 ? 'active' : ''} to="/nazo-chart">NazoChart</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className={url.indexOf('/reportRefProbability') != -1 ? 'active' : ''} to="/reportRefProbability">なにかの登録</NavLink>
                        </NavItem>
                        {/* 管理者のみ表示 */}
                        <NavItem>
                            <NavLink tag={Link} className={url.indexOf('/react/user-register-index') != -1 ? 'active' : ''} to="/react/user-register-index">ユーザ管理（未実装）</NavLink>
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
