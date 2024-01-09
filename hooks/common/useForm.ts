import { ConnectionError, InternalServerError, PayloadError } from '@/api/base/errors'
import { useEffect, useState } from 'react'

export type FormError<FormStateType> = Record<keyof FormStateType, string | null>

export type FormTouched<FormStateType> = Record<keyof FormStateType, boolean>

interface UseFormProps<FormStateType> {
  initialFieldValues: FormStateType
  onSubmit: (fieldValues: FormStateType) => void
  onValidate?: (fieldValues: FormStateType) => FormError<FormStateType>
}

export interface Form<FormStateType> {
  fieldValues: FormStateType
  setFieldValue: (fieldName: keyof FormStateType, value: any) => void
  handleSubmit: () => void
  errors: FormError<FormStateType>
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  touched: FormTouched<FormStateType>
}

export function useForm<FormStateType extends Record<string, any>>({
  initialFieldValues,
  onSubmit,
  onValidate,
}: UseFormProps<FormStateType>) {
  const [state, setState] = useState<FormStateType>(initialFieldValues)
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>('')
  const [hasBeenEdited, setHasBeenEdited] = useState(false)

  const [fieldErrorByName, setFieldErrorByName] = useState<FormError<FormStateType>>({} as FormError<FormStateType>)
  const [isFieldTouchedByName, setIsFieldTouchedByName] = useState<FormTouched<FormStateType>>(
    {} as FormTouched<FormStateType>
  )

  useEffect(() => {
    let validationErrors: FormError<FormStateType> = {} as FormError<FormStateType>
    if (typeof onValidate === 'function') {
      validationErrors = onValidate?.(state)
    }

    setFieldErrorByName({ ...validationErrors })
  }, [state])

  function setFieldValue(fieldName: keyof FormStateType, value: any) {
    setHasBeenEdited(true)
    setState(currentFieldValues => ({ ...currentFieldValues, [fieldName]: value }))
  }

  function isValid(validationErrors: FormError<FormStateType>) {
    let doesHasSomeValidationErrors = true
    Object.values(validationErrors).forEach(validationError => {
      if (validationError !== null) {
        doesHasSomeValidationErrors = false
        return
      }
    })
    return doesHasSomeValidationErrors
  }

  function onSubmitLocal() {
    let validationErrors: FormError<FormStateType> = {} as FormError<FormStateType>
    if (typeof onValidate === 'function') {
      validationErrors = onValidate?.(state)
    }

    setFieldErrorByName({ ...validationErrors })

    //touch all fields
    const newIsFormFieldTouchedByName: FormTouched<FormStateType> = Object.keys(state).reduce(
      (cur, fieldName) => ({ ...cur, [fieldName]: true }),
      {}
    ) as FormTouched<FormStateType>
    setIsFieldTouchedByName(newIsFormFieldTouchedByName)

    //stop form submission due to validation errors
    if (!isValid(validationErrors)) return

    //form is valid, can submit
    onSubmit(state)
  }

  function onBlur(event: React.FocusEvent<HTMLInputElement, Element>) {
    const newIsFieldTouchedByName = { ...isFieldTouchedByName }
    const fieldName = event.target.name
    if (!fieldName) return
    newIsFieldTouchedByName[fieldName as keyof FormStateType] = true
    setIsFieldTouchedByName(newIsFieldTouchedByName)
  }

  function onSubmitError(error: unknown) {
    if (error instanceof PayloadError) {
      if (error.fieldErrors) {
        setFieldErrorByName(error.fieldErrors as any)
        setErrorMessage('')
      } else {
        setErrorMessage(error.message)
      }
    }

    if (error instanceof InternalServerError) {
      setErrorMessage('Internal server error')
    }

    if (error instanceof ConnectionError) {
      setErrorMessage('Cannot connect to the server')
    }
  }

  return {
    state,
    setFieldValue,
    setFieldErrorByName,
    onSubmit: onSubmitLocal,
    fieldErrorByName,
    onBlur,
    isFieldTouchedByName,
    errorMessage,
    setErrorMessage,
    onSubmitError,
    hasBeenEdited,
  }
}
