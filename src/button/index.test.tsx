import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Button from '.'

describe('Button', () => {
  it('renders Button', () => {
    render(<Button>click</Button>)
    const likeElement = screen.getByText(/click/i)
    expect(likeElement).toBeInTheDocument()
  })

  it('renders normal Button', () => {
    const { container } = render(<Button>click me</Button>)

    expect(container.querySelector('.ant-btn-normal')).toBeInTheDocument()
  })

  it('renders primary Button', () => {
    const { container } = render(<Button type="primary">click me</Button>)

    expect(container.querySelector('.ant-btn-primary')).toBeInTheDocument()
  })

  it('should support click', () => {
    const onClick = vi.fn()
    render(
      <Button type="primary" onClick={onClick}>
        click
      </Button>
    )
    const likeElement = screen.getByText(/click/i)
    fireEvent.click(likeElement)

    expect(onClick).toBeCalled()
  })

  it('should support blur', () => {
    const onBlur = vi.fn()
    render(
      <Button type="primary" onBlur={onBlur}>
        click
      </Button>
    )
    const likeElement = screen.getByText(/click/i)
    fireEvent.blur(likeElement)

    expect(onBlur).toBeCalled()
  })
})
