import React from 'react'

export default function File({ file }) {
    return (
        <a href={file.url} target="_blank" rel="noreferrer" className="btn btn-outline-dark text-truncate w-100">
            {file.name}
        </a>
    )
}
