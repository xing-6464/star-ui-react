import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AutoComplete } from './autoComplete'

interface LakerPlayerProps {
  value: string
  number: number
}
interface GithubUserProps {
  login: string
  url: string
  avatar_url: string
}

export default {
  title: 'AutoComplete 组件',
  component: AutoComplete,
  id: 'AutoComplete',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  // argTypes: { onClick: { action: 'clicked' }, onSelect: { action: 'selected' }, onChange: { action: 'changed' } },
} as ComponentMeta<typeof AutoComplete>

const Template: ComponentStory<typeof AutoComplete> = (args) => (
  <AutoComplete {...args} />
)
export const Simple = Template.bind({})
const lakers = [
  'bradley',
  'pope',
  'caruso',
  'cook',
  'cousins',
  'james',
  'AD',
  'green',
  'howard',
  'kuzma',
  'McGee',
  'rando',
]
const handleFetch = (query: string) => {
  return lakers.filter((name) => name.includes(query))
  // .map((name) => ({ value: name }))
}
Simple.args = {
  fetchSuggestions: handleFetch,
  placeholder: '输入湖人队球员英文名试试',
}
