import React from 'react'
import classNames from 'classnames'

interface ButtonProps {
  className?: string
  type?: 'normal' | 'primary'
  children?: React.ReactNode
  style?: React.CSSProperties
  onClick?: Function
}

function Button(props: ButtonProps) {
  const { className, type = 'normal', style, onClick, children } = props

  const cls = classNames({
    'ant-btn': true,
    [`ant-btn-${type}`]: type,
    [className as string]: !!className,
  })
  return (
    <button className={cls} style={style} onClick={onClick}>
      click
    </button>
  )
}

export default Button
