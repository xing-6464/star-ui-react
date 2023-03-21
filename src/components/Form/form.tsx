import React from 'react'
import useStore from './useStore'

export interface FormProps {
  name?: string
  children?: React.ReactNode
}

export const Form: React.FC<FormProps> = (props) => {
  const { name, children } = props
  const { form, fields } = useStore()

  return (
    <>
      <form name={name} className="star-form">
        {children}
      </form>
      <div>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(fields)}</pre>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(form)}</pre>
      </div>
    </>
  )
}

Form.defaultProps = {
  name: 'star_form',
}

export default Form
