import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'
import folderIcon from '../../images/folder.png'

export default function Folder({ folder }) {
    return (
        <Button 
            to={{
                pathname: `/folder/${folder.id}`,
                state: { folder: folder },
            }}
            variant="outline-dark" 
            className="text-truncate w-100" 
            as={Link}
        >
                <Image className="mr-2" src={folderIcon} />
                <strong>{folder.name}</strong>
        </Button>
    )
}
