import React from 'react'
import Navbar from './Navbar'
import AddFolderButton from './AddFolderButton'
import Folder from './Folder'
import { Container } from 'react-bootstrap'
import { useFolder } from '../../hooks/useFolder'

export default function Dashboard() {
    const { folder, childFolders } = useFolder("oGUUKKOlDXrYo8Waqnho")
    return (
    <>
        <Navbar />
        <Container fluid>
            <AddFolderButton currentFolder={folder} />
            {childFolders.length > 0 && (
                <div className="d-flex flex-wrap">
                    {childFolders.map(childFolder => (
                        <div key={childFolder.id} style={{ maxWidth: "250px" }} className="p-2">
                            <Folder folder={childFolder} />
                        </div>
                    ))}
                </div>
            )} 
        </Container>
    </>
    )
}
