import React, { useContext, useEffect } from 'react'
import classNames from 'classnames'
import type { RuleItem } from 'async-validator'
import type { CustomRule } from './useStore'

import { FormContext } from './form'

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>

export interface FormItemProps {
  /**字段名 */
  name: string
  /**label 标签的文本 */
  label?: string
  children?: React.ReactNode
  /**子节点的值的属性，如 checkbox 的是 'checked' */
  valuePropName?: string
  /**设置收集字段值变更的时机 */
  trigger?: string
  /**设置如何将 event 的值转换成字段值 */
  getValueFromEvent?: (event: any) => any
  /**校验规则，设置字段的校验逻辑。请看 async validator 了解更多规则 */
  rules?: CustomRule[]
  /**设置字段校验的时机 */
  validateTrigger?: string
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  const {
    name,
    validateTrigger,
    valuePropName,
    trigger,
    getValueFromEvent,
    label,
    rules,
    children,
  } = props as SomeRequired<
    FormItemProps,
    'getValueFromEvent' | 'trigger' | 'valuePropName' | 'validateTrigger'
  >

  const rowClass = classNames('star-row', {
    'star-row-no-label': !label,
  })

  const { dispatch, fields, initialValues, validateField } =
    useContext(FormContext)

  useEffect(() => {
    const value = (initialValues && initialValues[name]) || ''
    dispatch({
      type: 'addField',
      name,
      value: {
        label,
        name,
        value: value,
        rules: rules || [],
        errors: [],
        isValid: true,
      },
    })
  }, [])

  const fieldState = fields[name]
  const value = fieldState && fieldState.value
  const errors = fieldState && fieldState.errors
  const isRequired = rules?.some(
    (rule) => typeof rule !== 'function' && rule.required
  )
  const hasError = errors && errors.length > 0
  const labelClass = classNames({
    'star-form-item-required': isRequired,
  })
  const itemClass = classNames('star-form-item-control', {
    'star-form-item-has-error': hasError,
  })
  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e)
    dispatch({ type: 'updateValue', name, value })
  }

  const onValueValidate = async () => {
    await validateField(name)
  }

  // 1.手动创建一个属性列表，需要有value 以及 onChange 属性
  const controlProps: Record<string, any> = {}
  controlProps[valuePropName] = value
  controlProps[trigger] = onValueUpdate
  if (rules) {
    controlProps[validateTrigger] = onValueValidate
  }

  // 2.获取 children 数组的第一个元素
  const childList = React.Children.toArray(children)
  // 没有子组件
  if (childList.length === 0) {
    console.error(
      'No child element found in Form.Item, please provide one form component'
    )
  }
  // 子组件大于一个
  if (childList.length > 1) {
    console.warn(
      'Only support one child element in Form.Item, others will be omitted'
    )
  }
  // 不是 ReactElement 的子组件
  if (!React.isValidElement(childList[0])) {
    console.error('Child component is not a valid React Element')
  }
  const child = childList[0] as React.ReactElement

  // 3.cloneElement，混合这个children 以及 手动的属性列表
  const returnChildNode = React.cloneElement(child, {
    ...child.props,
    ...controlProps,
  })

  return (
    <div className={rowClass}>
      {label && (
        <div className="star-form-item-label">
          <label title={label} className={labelClass}>
            {label}
          </label>
        </div>
      )}
      <div className="star-form-item">
        <div className={itemClass}>{returnChildNode}</div>
        {hasError && (
          <div className="star-form-item-explain">
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  )
}

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  validateTrigger: 'onBlur',
  getValueFromEvent: (e) => e.target.value,
}
export default FormItem
