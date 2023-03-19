import React from 'react'
import { Button } from './button'

import type { ComponentMeta, ComponentStory } from '@storybook/react'

const buttonMeta: ComponentMeta<typeof Button> = {
  title: 'Button',
  component: Button,
}

export default buttonMeta

export const Default: ComponentStory<typeof Button> = () => (
  <Button>Default Button</Button>
)

Default.storyName = '默认按钮样式'

export const ButtonWithSize: ComponentStory<typeof Button> = () => (
  <>
    <Button size="lg">large button</Button>
    <Button size="sm">small button</Button>
  </>
)

ButtonWithSize.storyName = '不同尺寸按钮'

export const ButtonWithType: ComponentStory<typeof Button> = () => (
  <>
    <Button btnType="primary">默认</Button>
    <Button btnType="danger">警告</Button>
    <Button btnType="link" href="https://google.com">
      链接
    </Button>
  </>
)

ButtonWithType.storyName = '不同样式'
