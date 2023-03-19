import React from 'react'
import { config } from 'react-transition-group'
import { render, fireEvent, screen } from '@testing-library/react'

import { Alert, AlertProps } from '.'
config.disabled = true

// vi.mock('../Icon/icon', () => {
//   // return (props: any) => {
//   //   return <span>{props.icon}</span>
//   // }
//   return {
//     default: (props: any) => <span>{props.icon}</span>,
//   }
// })

const testProps: AlertProps = {
  title: 'title',
  onClose: vi.fn(),
}

const typeProps: AlertProps = {
  ...testProps,
  type: 'success',
  description: 'hello',
  closable: false,
}
describe('test Alert Component', () => {
  it('should render the correct default Alert', () => {
    const { container } = render(<Alert {...testProps} />)
    expect(screen.queryByText('title')).toBeInTheDocument()
    expect(container.querySelector('.star-alert')).toHaveClass(
      'star-alert-default'
    )
    fireEvent.click(screen.getByText('times'))
    expect(testProps.onClose).toHaveBeenCalled()
    expect(screen.queryByText('title')).not.toBeInTheDocument()
  })
  it('should render the correct Alert based on different type and description', () => {
    const { container } = render(<Alert {...typeProps} />)
    expect(screen.queryByText('title')).toHaveClass('bold-title')
    // expect(container.querySelector('.star-alert')).toHaveClass(
    //   'star-alert-success'
    // )
    expect(screen.queryByText('hello')).toBeInTheDocument()
    expect(screen.queryByText('times')).not.toBeInTheDocument()
  })
})
