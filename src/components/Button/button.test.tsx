import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './button'
import type { ButtonProps } from './buttonProps'

const defaultProps = {
  onClick: vi.fn(),
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass',
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: vi.fn(),
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Click</Button>)

    const element = screen.getByText('Click') as HTMLButtonElement

    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()

    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>Click</Button>)

    const element = screen.getByText('Click')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })

  it('should render a link when btnType equals link and href is provided', () => {
    render(
      <Button btnType="link" href="http://www.">
        Link
      </Button>
    )

    const element = screen.getByText('Link')

    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>Click</Button>)

    const element = screen.getByText('Click') as HTMLButtonElement

    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()

    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
