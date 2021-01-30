import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { database } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'

export default function AddFolderButton() {
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

        // Create a foler
        database.folders.add({
            name: name,
            // parentId: ,
            userId: currentUser.uid,
            // path: ,
            createdAt: database.getCurrentTimestamp(),
        })
        setName('')
        closeModal()
    }

    return (
        <>
        <Button onClick={openModal} variant="outline-success" size="sm" >
            <strong>Tạo thư mục</strong>
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
