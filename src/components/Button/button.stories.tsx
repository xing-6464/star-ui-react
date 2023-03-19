import React from 'react'
import { Button } from './button'

import type { ComponentMeta, ComponentStory } from '@storybook/react'

const buttonMeta: ComponentMeta<typeof Button> = {
  title: 'Button',
  component: Button,
}
export default buttonMeta

const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args}></Button>
}

export const Default = Template.bind({})
Default.args = {
  children: 'Default Button',
}
Default.decorators = [
  (Story) => {
    return <div style={{ margin: '50px' }}>{Story()}</div>
  },
]

export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  children: 'Large Button',
}
export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  children: 'Small Button',
}
export const Primary = Template.bind({})
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button',
}
export const Danger = Template.bind({})
Danger.args = {
  btnType: 'danger',
  children: 'Danger Button',
}
export const Link = Template.bind({})
Link.args = {
  btnType: 'link',
  children: 'Link Button',
  href: 'https://google.com',
}

// export const ButtonWithSize: ComponentStory<typeof Button> = () => (
//   <>
//     <Button size="lg">large button</Button>
//     <Button size="sm">small button</Button>
//   </>
// )

// ButtonWithSize.storyName = '不同尺寸按钮'

// export const ButtonWithType: ComponentStory<typeof Button> = () => (
//   <>
//     <Button btnType="primary">默认</Button>
//     <Button btnType="danger">警告</Button>
//     <Button btnType="link" href="https://google.com">
//       链接
//     </Button>
//   </>
// )

// ButtonWithType.storyName = '不同样式'
