import React from 'react'
import { ComponentMeta } from '@storybook/react'
import Form from './form'
import Item from './formItem'
import Input from '../Input'
import Button from '../Button'

export default {
  title: 'Form 组件',
  id: 'Form',
  component: Form,
  subcomponents: { Item },
  decorators: [(Story) => <div style={{ width: '550px' }}>{Story()}</div>],
} as ComponentMeta<typeof Form>

export const BasicForm = () => {
  return (
    <Form initialValues={{ username: 'xing', agreement: true }}>
      <Item label="用户名" name="username">
        <Input />
      </Item>
      <Item label="密码" name="password">
        <Input type="password" />
      </Item>
      <div
        className="agreement-section"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Item
          name="agreement"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked}
        >
          <input type="checkbox" />
        </Item>
        <span className="agree-text">
          注册即代表你同意<a href="#">用户协议</a>
        </span>
      </div>
      <div className="star-form-submit-area">
        <Button type="submit" btnType="primary">
          登录
        </Button>
      </div>
    </Form>
  )
}
