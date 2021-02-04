import React from 'react'
import { Navbar, Nav, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../images/drive-logo.png'

export default function NavbarComponent() {
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand as={Link} to="/">
                <Image src={logo} width="200px" height="300px" fluid/>
            </Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/user">
                    <strong>Hồ sơ</strong>
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}
