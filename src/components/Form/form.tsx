import React from 'react'

export interface FormProps {
  name?: string
  children?: React.ReactNode
}

export const Form: React.FC<FormProps> = (props) => {
  const { name, children } = props

  return (
    <form name={name} className="star-form">
      {children}
    </form>
  )
}

Form.defaultProps = {
  name: 'star_form',
}

export default Form
