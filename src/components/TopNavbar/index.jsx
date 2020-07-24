import React from 'react';
import PropTypes from 'prop-types';

// Contexts
import { useAuth } from '../../contexts/Authentication';

// Bootstrap
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Assets
import logo from '../../assets/img/logo.png';

import './styles.css';

/*
    This component defines the site's top navbar. Some options are based on the authenticated user.
*/
const TopNavbar = ({ activeItem }) => {
    const { user, signOut } = useAuth();

    return (
        <Navbar bg="light" variant="light" expand="lg" id="top-navbar">
            <Navbar.Brand href="/">
                <img src={logo} width="48" alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />

            <Navbar.Collapse id="navbarSupportedContent">
                <Nav className="mr-auto">
                    <NavLink
                        href="/home"
                        active={activeItem === 'home' && activeItem}
                    >
                        Principal
                    </NavLink>
                    <NavLink
                        href="/orders"
                        active={activeItem === 'orders' && activeItem}
                    >
                        Pedidos
                    </NavLink>
                </Nav>

                <Nav>
                    <span></span>
                    <NavDropdown
                        alignRight
                        title={(user.name || 'No name').toUpperCase()}
                        id="username-dropdown"
                    >
                        <NavDropdown.Item href="/config">
                            Configurações
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#" onClick={signOut}>
                            Sair
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

TopNavbar.propTypes = {
    activeItem: PropTypes.string,
};

TopNavbar.defaultProps = {
    activeItem: undefined,
};

export default TopNavbar;
