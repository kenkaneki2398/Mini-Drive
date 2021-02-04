import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { database, storage } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { v4 as uuidV4 } from 'uuid'
import { Toast, ProgressBar, Image } from 'react-bootstrap'
import uploadFileIcon from '../../images/upload.png'

export default function AddFileButton({ currentFolder }) {
    const [uploadingFiles, setUploadingFiles] = useState([])
    const { currentUser } = useAuth()

    function handleUpload(e) {
        const file = e.target.files[0]

        if (currentFolder == null || file == null) return

        const id = uuidV4()
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            { id: id, name: file.name, progress: 0, error: false }
        ])

        const filePath = currentFolder === ROOT_FOLDER 
            ? `${currentFolder.path.join("/")}/${file.name}` 
            : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`
        
        const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file)

        uploadTask.on('state-change', snapshot => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, progress: progress }
                    }
                    return uploadFile
                })
            })
        }, () => {
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, error: true }
                    }
                    return uploadFile
                })
            })
        }, () => {
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.filter(uploadFile => {
                    return uploadFile.id !== id
                })
            })
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                database.files
                    .where("name", "==", file.name)
                    .where("userId", "==", currentUser.uid)
                    .where("folderId", "==", currentFolder.id)
                    .get()
                    .then(existingFiles => {
                        const existingFile = existingFiles.docs[0]
                        if (existingFile) {
                            existingFile.ref.update({ url: url })
                        } else {
                            database.files.add({
                                url: url,
                                name: file.name,
                                createdAt: database.getCurrentTimestamp(),
                                folderId: currentFolder.id,
                                userId: currentUser.uid,
                            })
                        }
                    })
            })
        })
    }

    return (
        <>
        <label className="btn btn-outline-success btn-sm m-0 mr-2 mt-2">
            <Image src={uploadFileIcon} />
            <input type="file" onChange={handleUpload} style={{ opacity: 0, position: "absolute", left: "-9999px" }} />
        </label>
        {uploadingFiles.length > 0 &&
            ReactDOM.createPortal(
                <div 
                style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                    maxWidth: "250px"
                }}>
                    {uploadingFiles.map(file => (
                        <Toast key={file.id} onClose={() => {
                            setUploadingFiles(prevUploadingFiles => {
                                return prevUploadingFiles.filter(uploadFile => {
                                    return uploadFile.id !== file.id
                                })
                            })
                        }}>
                            <Toast.Header className="text-truncate w-100 d-block" closeButton={file.error}>
                                {file.name}
                            </Toast.Header>
                            <Toast.Body>
                                <ProgressBar
                                    animated={!file.error}
                                    variant={file.erroe ? "danger" : "primary"}
                                    now={file.error ? 100 : file.progress * 100}
                                    label={file.error ? "Lỗi" : `${Math.round(file.progress * 100)}%`}
                                />
                            </Toast.Body>
                        </Toast>
                    ))}
                </div>,
                document.body
            )}
        </>
    )
}
