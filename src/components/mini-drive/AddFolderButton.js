import React, { useState } from 'react'
import { Button, Modal, Form, Image } from 'react-bootstrap'
import { database } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import newFolderIcon from '../../images/new-folder.png'

export default function AddFolderButton({ currentFolder }) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const { currentUser } = useAuth()

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (currentFolder == null) return

        const path = [...currentFolder.path]
        if (currentFolder !== ROOT_FOLDER) {
            path.push({ name: currentFolder.name, id: currentFolder.id })
        }
        database.folders.add({
            name: name,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: path,
            createdAt: database.getCurrentTimestamp(),
        })
        setName('')
        closeModal()
    }

    return (
        <>
        <Button onClick={openModal} variant="outline-success" size="sm" className="mt-2" >
            <Image src={newFolderIcon} />
        </Button>
        <Modal show={open} onHide={closeModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Tên thư mục</Form.Label>
                        <Form.Control type="text" required value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Đóng</Button>
                    <Button variant="success" type="submit">Tạo thư mục</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}
