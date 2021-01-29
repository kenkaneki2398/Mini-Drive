import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Mật khẩu không trùng khớp !')
        }

        const promises = []
        setLoading(true)
        setError('')

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history.push('/')
            })
            .catch(() => {
                setError('Cập nhật thất bại !')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">CẬP NHẬT HỒ SƠ</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Bỏ trống để giữ nguyên mật khẩu"></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Nhập lại mật khẩu</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Bỏ trống để giữ nguyên mật khẩu"></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Cập nhật</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Hủy</Link>
            </div>
        </>
    )
}
