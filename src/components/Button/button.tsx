import classNames from 'classnames'
import React from 'react'

import type { ButtonProps } from './buttonProps'

export const Button: React.FC<ButtonProps> = (props) => {
  const { btnType, className, size, children, disabled, href, ...restProps } =
    props

  const classes = classNames(className, 'btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  })

  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}
