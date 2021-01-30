import React from 'react'
import Navbar from './Navbar'
import AddFolderButton from './AddFolderButton'
import { Container } from 'react-bootstrap'

export default function Dashboard() {
    return (
    <>
        <Navbar />
        <Container fluid>
            <AddFolderButton />
        </Container>
    </>
    )
}
