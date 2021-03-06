import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import './styles.css'

interface DropzoneProps {
  onFileUpload: (file: File) => void
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUpload }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')


  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]

    if (!file) {return}

    const fileUrl = URL.createObjectURL(file)

    setSelectedFileUrl(fileUrl)
    onFileUpload(file)
  }, [onFileUpload])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*"/>

      {
        selectedFileUrl
        ? <img src={selectedFileUrl} alt="Point thumbnail"/>
        : (
          <p>
            <FiUpload />
            Imagem do estabelecimento
        </p>
        )
      }

     
    </div>
  )
}
export default Dropzone