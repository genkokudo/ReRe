import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'; // これでBootStrapのような見た目にできる
import { Link } from 'react-router-dom';
import './NavMenu.css'; // CSSを読み込める

/**
 * 画面上部のNavMenuを定義する
 */
export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    // Reduxを使用するので、Componentは基本的にstateは持たない。
    public state = {
        // ハンバーガーメニュー表示状態
        isOpen: false
    };

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        {/* ブランド表示 */}
                        <NavbarBrand tag={Link} to="/">ReactRedux</NavbarBrand>
                        {/* 小さい画面の時ハンバーガーメニュー表示 */}
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                {/* toでどのtsxコンポーネントに飛ぶかは、App.tsxで設定する。 */}
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/nazo-chart">NazoChart</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/nazo-map">NazoMap</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
