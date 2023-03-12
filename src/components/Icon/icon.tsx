import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

export const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props
  const classes = classNames('star-icon', className, {
    [`icon-${theme}`]: theme,
  })

  return <FontAwesomeIcon className={classes} {...restProps} />
}
