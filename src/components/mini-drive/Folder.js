import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Folder({ folder }) {
    return (
        <Button to={`/folder/${folder.id}`} variant="outline-dark" className="text-truncate w-100" as={Link}>
            <strong>{folder.name}</strong>
        </Button>
    )
}
