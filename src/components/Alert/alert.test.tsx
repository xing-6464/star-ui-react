import { render, screen } from '@testing-library/react'
import Alert from './alert'

describe('test alert component', () => {
  it('default mode', () => {
    render(<Alert title="this is title"></Alert>)

    const element = screen.getByText(/this is title/i)

    expect(element.tagName).toEqual('SPAN')
    expect(element).toHaveClass('star-alert-title bold-title')
  })
})
