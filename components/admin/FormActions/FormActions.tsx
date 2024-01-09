import VsButton from '@/components/common/controls/VsButton/VsButton'
import styles from './FormActions.module.scss'
import VsLink from '@/components/common/controls/VsLink/VsLink'
import classNames from 'classnames'

interface FormActionsProps {
  cancelHref: string
  isShown?: boolean
  isDisabled?: boolean
  onSave?: () => void
}

export default function FormActions({ isShown, isDisabled, cancelHref, onSave }: FormActionsProps) {
  return (
    <div className={classNames(styles.root, !isShown && styles.rootHidden)}>
      <div className={styles.content}>
        <VsLink className={styles.cancel} type='outline' href={cancelHref}>Cancel</VsLink>
        <VsButton onClick={onSave} isDisabled={isDisabled}>Save</VsButton>
      </div>
    </div>
  )
}
