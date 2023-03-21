import React, { useContext, useEffect } from 'react'
import classNames from 'classnames'

import { FormContext } from './form'

export interface FormItemProps {
  name: string
  label?: string
  children?: React.ReactNode
}

export const Item: React.FC<FormItemProps> = (props) => {
  const { name, label, children } = props

  const rowClass = classNames('star-row', {
    'star-row-no-label': !label,
  })

  const { dispatch, fields } = useContext(FormContext)

  useEffect(() => {
    dispatch({ type: 'addField', name, value: { label, name, value: '' } })
  }, [])

  const fieldState = fields[name]
  const value = fieldState && fieldState.value
  const onValueUpdate = (e: any) => {
    const value = e.target.value
    console.info('new value', value)
    dispatch({ type: 'updateValue', name, value })
  }

  // 1.手动创建一个属性列表，需要有value 以及 onChange 属性
  const controlProps: Record<string, any> = {}
  controlProps.value = value
  controlProps.onChange = onValueUpdate

  // 2.获取 children 数组的第一个元素
  const childList = React.Children.toArray(children)

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
          <label title={label}>{label}</label>
        </div>
      )}
      <div className="star-form-item">{returnChildNode}</div>
    </div>
  )
}

export default Item
