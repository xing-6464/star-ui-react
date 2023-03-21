import classNames from 'classnames'
import React from 'react'

export interface FormItemProps {
  label?: string
  children?: React.ReactNode
}

export const Item: React.FC<FormItemProps> = (props) => {
  const { label, children } = props

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
