import React from 'react'
import classNames from 'classnames'

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  className?: string
  type?: 'normal' | 'primary' | 'deshed' | 'link' | 'text'
  size?: 'small' | 'medium' | 'large'
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onBlur?: React.FocusEventHandler<HTMLButtonElement>
  children?: React.ReactNode
}

function Button(props: ButtonProps) {
  const { className, type = 'normal', style, onClick, children, onBlur } = props

  const cls = classNames({
    'ant-btn': true,
    [`ant-btn-${type}`]: type,
    [className as string]: !!className,
  })
  return (
    <button className={cls} style={style} onClick={onClick} onBlur={onBlur}>
      {children}
    </button>
  )
}

export default Button
