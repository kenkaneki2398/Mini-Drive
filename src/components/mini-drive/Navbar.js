import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavbarComponent() {
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand as={Link} to="/">
                Mini Drive
            </Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/user">
                    Hồ sơ
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}
