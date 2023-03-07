import { render, screen } from '@testing-library/react'
import Alert from './alert'

describe('test alert component', () => {
  it('default mode', () => {
    render(<Alert title="this is title"></Alert>)

    const element = screen.getByText(/this is title/i)
    const element2 = screen.getByText(/关闭/i)

    expect(element.tagName).toEqual('SPAN')
    expect(element).toHaveClass('star-alert-title')

    expect(element2.tagName).toEqual('SPAN')
    expect(element2).toHaveClass('star-alert-close')
  })
})
