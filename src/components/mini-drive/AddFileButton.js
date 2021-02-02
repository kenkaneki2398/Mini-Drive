import React from 'react'
import { database, storage } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { ROOT_FOLDER } from '../../hooks/useFolder'

export default function AddFileButton({ currentFolder }) {
    const { currentUser } = useAuth()

    function handleUpload(e) {
        const file = e.target.files[0]

        if (currentFolder == null || file == null) return

        const filePath = currentFolder === ROOT_FOLDER 
            ? `${currentFolder.path.join("/")}/${file.name}` 
            : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`
        
        const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file)

        uploadTask.on('state-change', snapshot => {

        }, () => {
            
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                database.files.add({
                    url: url,
                    name: file.name,
                    createdAt: database.getCurrentTimestamp(),
                    folderId: currentFolder.id,
                    userId: currentUser.uid,
                })
            })
        })
    }

    return (
        <label className="btn btn-outline-success btn-sm m-0 mr-2 mt-2">
            <strong>Upload file</strong>
            <input type="file" onChange={handleUpload} style={{ opacity: 0, position: "absolute", left: "-9999px" }} />
        </label>
    )
}
