'use client'

import { useRef, useState } from 'react'
import styles from './AvatarUploader.module.scss'
import PlusIcon from '@/components/common/icons/Plus'
import UserIcon from '@/components/common/icons/User'

interface AvatarUploaderProps {
  initialAvatarUrl: string | null
  onChange?: (imageBase64: string) => void
}

export default function AvatarUploader({ initialAvatarUrl, onChange }: AvatarUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState(initialAvatarUrl)
  const fileInputEl = useRef<HTMLInputElement | null>(null)

  const onUploadButtonClick = () => {
    fileInputEl.current!.value = ''
    fileInputEl.current!.click()
  }

  const onFileSelect = () => {
    const selectedFile = fileInputEl.current!.files?.item(0)
    if (!selectedFile) return

    const fileUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(fileUrl)

    const fileReader = new FileReader()
    fileReader.readAsDataURL(selectedFile)
    fileReader.onload = () => onChange?.(fileReader.result as string)
  }

  return (
    <div className={styles.root}>
      <input ref={fileInputEl} className={styles.fileInput} type="file" accept="image/*" onChange={onFileSelect} />

      <button className={styles.uploadButton} onClick={onUploadButtonClick}>
        {previewUrl ? (
          <img className={styles.preview} src={previewUrl} alt="Avatar" />
        ) : (
          <div className={styles.preview}>
            <UserIcon />
          </div>
        )}

        <div className={styles.actionName}>{previewUrl ? 'Edit photo' : 'Set photo'}</div>
        <div className={styles.plus}>
          <PlusIcon className={styles.plusIcon} />
        </div>
      </button>
    </div>
  )
}
