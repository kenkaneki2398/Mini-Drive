import React from 'react'
import { Image } from 'react-bootstrap'
import fileIcon from '../../images/file.png'

export default function File({ file }) {
    return (
        <a href={file.url} target="_blank" rel="noreferrer" className="btn btn-outline-dark text-truncate w-100">
            <Image className="mr-2" src={fileIcon} />
            <strong>{file.name}</strong>
        </a>
    )
}
