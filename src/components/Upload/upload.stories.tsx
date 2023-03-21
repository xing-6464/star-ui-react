import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload } from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'

export default {
  title: 'Upload 组件',
  id: 'Upload',
  component: Upload,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as ComponentMeta<typeof Upload>

export const ASimpleUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
    />
  )
}
ASimpleUpload.storyName = '普通的 Upload 组件'
