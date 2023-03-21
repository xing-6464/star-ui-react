import React from 'react'
import { ComponentMeta } from '@storybook/react'
import Form from './form'
import Item from './formItem'
import Input from '../Input'
import Button from '../Button'
import type { CustomRule } from './useStore'

export default {
  title: 'Form 组件',
  id: 'Form',
  component: Form,
  subcomponents: { Item },
  decorators: [(Story) => <div style={{ width: '550px' }}>{Story()}</div>],
} as ComponentMeta<typeof Form>

const confirmRules: CustomRule[] = [
  { type: 'string', required: true, min: 3, max: 8 },
  ({ getFiledValue }) => ({
    asyncValidator(rule, value) {
      console.info('the value', getFiledValue['password'])
      console.info(value)

      return new Promise((resolve, reject) => {
        if (value !== getFiledValue(['password'])) {
          reject('The two password that you entered do not match')
        }
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      if (value !== getFiledValue(['password'])) {
        return Promise.reject('The two password that you entered do not match')
      }
      return Promise.resolve()
    },
  }),
]
export const BasicForm = (args: any) => {
  return (
    <Form initialValues={{ username: 'xing', agreement: true }} {...args}>
      {({ isValid, isSubmitting }) => (
        <>
          <Item
            label="用户名"
            name="username"
            rules={[{ type: 'email', required: true }]}
          >
            <Input />
          </Item>
          <Item
            label="密码"
            name="password"
            rules={[{ type: 'string', required: true, min: 3, max: 8 }]}
          >
            <Input type="password" />
          </Item>
          <Item label="重复密码" name="confirmPwd" rules={confirmRules}>
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
              rules={[{ type: 'enum', enum: [true], message: '请同意协议' }]}
            >
              <input type="checkbox" />
            </Item>
            <span className="agree-text">
              注册即代表你同意<a href="#">用户协议</a>
            </span>
          </div>
          <div className="star-form-submit-area">
            <Button type="submit" btnType="primary">
              登录 {isSubmitting ? '验证中' : '验证完毕'}{' '}
              {isValid ? '通过' : '没有通过'}
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
