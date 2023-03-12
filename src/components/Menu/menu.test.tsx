import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Menu, MenuItme, SubMenu } from '.'

import type { MenuProps } from '.'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: vi.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['3'],
}

const createStyleFile = () => {
  const cssFile: string = `
    .star-submenu {
      display: none;
    }
    .star-submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile

  return style
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItme>active</MenuItme>
      <MenuItme disabled>disabled</MenuItme>
      <MenuItme>xyz</MenuItme>
      <SubMenu title="dropdown">
        <MenuItme>drop1</MenuItme>
      </SubMenu>
    </Menu>
  )
}

let menuElement: HTMLElement | null,
  activeElement: HTMLElement | null,
  disabledElement: HTMLElement | null
const setup = (props: MenuProps) => {
  const { container } = render(generateMenu(props))
  container.append(createStyleFile())
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
    expect(menuElement?.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    setup(testProps)
    const thirdItem = screen.getByText('xyz')

    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')

    fireEvent.click(disabledElement!)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('should render vertical mode when mode is set to vertical', () => {
    setup(testVerProps)

    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('should show dropdown items when hover on subMenu', async () => {
    setup(testProps)

    expect(screen.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = screen.getByText('dropdown')

    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(screen.queryByText('drop1')).toBeVisible()
    })

    fireEvent.click(screen.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(screen.queryByText('drop1')).not.toBeVisible()
    })
  })

  it('vertical should show dropdown items when hover on subMenu', () => {
    setup(testVerProps)

    expect(screen.getByText('drop1')).toBeVisible()
  })
})
