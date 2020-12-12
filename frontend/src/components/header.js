import React, { useContext, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Navbar, Nav, Image } from 'react-bootstrap';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from "react-router-dom";
import ReactGA from 'react-ga';
import UserContext from '../UserContext';
import getApiUrl from '../utils';

function Header() {
    const { authState, authService } = useOktaAuth();
    const { user, setUser } = useContext(UserContext);
    const API_URL = getApiUrl();
    const history = useHistory();

    function trackPageView() {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    useEffect(() => {
        trackPageView();
        history.listen(trackPageView);
    }, [history]);

    useEffect(() => {
        if (!authState.isAuthenticated) {
            // When user isn't authenticated, forget any user info
            setUser(null);
        } else {
            const { accessToken } = authState;
            fetch(`${API_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        return Promise.reject();
                    }
                    return response.json();
                })
                .then((data) => {
                    setUser(data);
                })
                .catch((err) => {
                    /* eslint-disable no-console */
                    console.error(err);
                });
        }
    }, [authState, authService]); // Update if authState changes

    async function logout() {
        authService.logout('/');
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg">
                <Image src="/logo192.png" style={{ 'height': '1.5rem', 'paddingRight': '0.2rem' }} />
                <Navbar.Brand as={Link} to="/" className="font-weight-bold">Tigerstance</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/buy-call">Buy call</Nav.Link>
                        <Nav.Link as={Link} to="/sell-covered-call">Sell covered call</Nav.Link>
                        <Nav.Link as={Link} to="/buy-put">Buy put</Nav.Link>
                        <Nav.Link as={Link} to="/sell-cash-secured-put">Sell cash secured put</Nav.Link>
                    </Nav>
                    {authState.isAuthenticated ?
                        <Nav>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
                        </Nav>
                        :
                        <Nav>
                            <Nav.Link href="/signin">Login</Nav.Link>
                            <Nav.Link href="/signin/register">Sign Up</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default Header