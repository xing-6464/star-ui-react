import { useReducer, useState } from 'react'
import Schema, { RuleItem, ValidateError } from 'async-validator'
import { each, mapValues } from 'lodash-es'

export type CustomRuleFunc = ({ getFieldValue }: any) => RuleItem
export type CustomRule = RuleItem | CustomRuleFunc

export interface FieldDetail {
  name: string
  value: string
  rules: CustomRule[]
  isValid: boolean
  errors: ValidateError[]
}

export interface ValidateErrorType extends Error {
  errors: ValidateError[]
  fields: Record<string, ValidateError[]>
}

export interface FieldsState {
  [key: string]: FieldDetail
}

export interface FormState {
  isValid: boolean
  isSubmitting: boolean
  errors: Record<string, ValidateError[]>
}

export interface FieldsAction {
  type: 'addField' | 'updateValue' | 'updateValidateResult'
  name: string
  value: any
}

function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: { ...action.value },
      }
    case 'updateValue':
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value },
      }
    case 'updateValidateResult':
      const { isValid, errors } = action.value
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors },
      }
    default:
      return state
  }
}

function useStore() {
  const [form, setForm] = useState<FormState>({
    isValid: true,
    isSubmitting: false,
    errors: {},
  })
  const [fields, dispatch] = useReducer(fieldsReducer, {})

  const getFiledValue = (key: string) => {
    return fields[key] && fields[key].value
  }
  const transfromRules = (rules: CustomRule[]) => {
    return rules.map((rule) => {
      if (typeof rule === 'function') {
        const calledRull = rule({ getFiledValue })
        return calledRull
      } else {
        return rule
      }
    })
  }
  const validateField = async (name: string) => {
    const { value, rules } = fields[name]
    const afterRules = transfromRules(rules)

    const descriptor = {
      [name]: afterRules,
    }
    const valueMap = {
      [name]: value,
    }
    const validator = new Schema(descriptor)
    let isValid = true
    let errors: ValidateError[] = []
    try {
      await validator.validate(valueMap)
    } catch (e) {
      isValid = false
      const err = e as any
      console.info('e', err.errors)
      console.info('fields', err.fields)
      errors = err.errors
    } finally {
      console.info('errors', isValid)
      dispatch({
        type: 'updateValidateResult',
        name,
        value: { isValid, errors },
      })
    }
  }

  const validateAllFields = async () => {
    let isValid = true
    let errors: Record<string, ValidateError[]> = {}
    // { 'username': 'abc' }
    const valueMap = mapValues(fields, (item) => item.value)
    const descriptor = mapValues(fields, (item) => transfromRules(item.rules))
    const validator = new Schema(descriptor)
    setForm({ ...form, isSubmitting: true })
    try {
      await validator.validate(valueMap)
    } catch (e) {
      isValid = false
      const err = e as ValidateErrorType
      errors = err.fields
      each(fields, (value, name) => {
        // errors 中有对应的 key
        if (errors[name]) {
          const itemErrors = errors[name]
          dispatch({
            type: 'updateValidateResult',
            name,
            value: { isValid: false, errors: itemErrors },
          })
        } else if (value.rules.length > 0 && !errors[name]) {
          // 有对应的rules，并且没有 errors
          dispatch({
            type: 'updateValidateResult',
            name,
            value: { isValid: false, errors: [] },
          })
        }
      })
    } finally {
      setForm({ ...form, isSubmitting: false, isValid, errors })
      return {
        isValid,
        errors,
        values: valueMap,
      }
    }
  }

  return {
    fields,
    dispatch,
    form,
    validateField,
    getFiledValue,
    validateAllFields,
  }
}

export default useStore
