import React from 'react'
import styles from './VsConfirmModal.module.scss'
import VsButton from '../../controls/VsButton/VsButton'
import CloseIcon from '../../icons/Close'

interface VsConfirmModalProps {
  onClose?: () => void
  onConfirm?: () => void
  headerText?: string
  bodyText: string
  isLoading?: boolean
}

function VsConfirmModal({
  onClose,
  headerText = 'Are you sure?',
  bodyText,
  onConfirm,
  isLoading,
}: VsConfirmModalProps) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.heading}>{headerText}</h2>
        <p className={styles.bodyText}>{bodyText}</p>

        <div className={styles.actionButtonContainer}>
          <VsButton className={styles.cancelButton} onClick={onClose}>
            I am not sure
          </VsButton>
          <VsButton className={styles.confirmButton} onClick={onConfirm} isDisabled={isLoading}>
            Yes, delete
          </VsButton>
        </div>

        <div className={styles.closeIcon} onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
    </div>
  )
}

export default VsConfirmModal
