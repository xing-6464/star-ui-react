import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Menu, MenuItme } from '.'

import type { MenuProps } from '.'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: vi.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItme index={0}>active</MenuItme>
      <MenuItme index={1} disabled>
        disabled
      </MenuItme>
      <MenuItme index={2}>xyz</MenuItme>
    </Menu>
  )
}

let menuElement: HTMLElement | null,
  activeElement: HTMLElement | null,
  disabledElement: HTMLElement | null
const setup = (props: MenuProps) => {
  render(generateMenu(props))
  menuElement = screen.getByTestId('test-menu')
  activeElement = screen.getByText('active')
  disabledElement = screen.getByText('disabled')
}

describe('test Menu and MenuItem component', () => {
  afterEach(() => {
    menuElement = null
    activeElement = null
    disabledElement = null
  })

  it('should render correr Menu and MenuItem based on default props', () => {
    setup(testProps)
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('star-menu test')
    expect(menuElement?.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    setup(testProps)
    const thirdItem = screen.getByText('xyz')

    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)

    fireEvent.click(disabledElement!)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })

  it('should render vertical mode when mode is set to vertical', () => {
    setup(testVerProps)

    expect(menuElement).toHaveClass('menu-vertical')
  })
})
