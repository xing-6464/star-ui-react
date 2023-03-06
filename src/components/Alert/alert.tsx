import classNames from 'classnames'
import React, { useState } from 'react'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
  title?: string
  description?: string
  type?: AlertType
  onClose?: () => void
  closable?: boolean
}

const Alert: React.FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false)
  const { title, description, type, onClose, closable } = props

  const classes = classNames('star-alert', {
    [`star-alert-${type}`]: type,
  })
  const titleClass = classNames('star-alert-title', {
    'bold-title': description,
  })
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose()
    }
    setHide(true)
  }

  if (!hide) {
    return (
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className="star-alert-desc">{description}</p>}
        {closable && (
          <span className="star-alert-close" onClick={handleClose}>
            关闭
          </span>
        )}
      </div>
    )
  } else {
    return <></>
  }
}

Alert.defaultProps = {
  type: 'default',
  closable: true,
}

export default Alert
