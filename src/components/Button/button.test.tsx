import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from './button'

describe('test Button', () => {
  it('our first react test case', () => {
    render(<Button>Click</Button>)

    expect(screen.queryByText('Click')).toBeTruthy()
  })
})
