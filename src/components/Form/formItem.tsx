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

  const { dispatch } = useContext(FormContext)

  useEffect(() => {
    dispatch({ type: 'addField', name, value: { label, name } })
  }, [])
  const rowClass = classNames('star-row', {
    'star-row-no-label': !label,
  })

  return (
    <div className={rowClass}>
      {label && (
        <div className="star-form-item-label">
          <label title={label}>{label}</label>
        </div>
      )}
      <div className="star-form-item">{children}</div>
    </div>
  )
}

export default Item
