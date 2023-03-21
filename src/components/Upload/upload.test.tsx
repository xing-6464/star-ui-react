import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import type { Mocked } from 'vitest'

import { Upload, UploadProps } from './upload'

vi.mock('../Icon/icon.tsx', () => {
  return {
    default: (props: any) => <span onClick={props.onClick}>{props.icon}</span>,
  }
})
vi.mock('axios')

const mockedAxios = axios as Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: vi.fn(),
  onChange: vi.fn(),
  onRemove: vi.fn(),
  drag: true,
}

let fileInput: HTMLInputElement, uploadArea: HTMLElement

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

describe('test upload component', () => {
  beforeEach(() => {
    const { container } = render(
      <Upload {...testProps}>Click to upload</Upload>
    )
    fileInput = container.querySelector('.star-file-input') as HTMLInputElement
    uploadArea = screen.queryByText('Click to upload') as HTMLElement
  })

  it('upload process should works fine', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'cool' })

    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()

    fireEvent.change(fileInput, { target: { files: [testFile] } })
    expect(screen.queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText('test.png')).toBeInTheDocument()
      expect(screen.queryByText('check-circle')).toBeInTheDocument()
    })

    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'cool',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png',
      })
    )
    expect(testProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png',
      })
    )

    //remove the uploaded file
    expect(screen.queryByText('times')).toBeInTheDocument()
    fireEvent.click(screen.getByText('times'))
    expect(screen.queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png',
      })
    )
  })

  it('drag and drop files should works fine', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'cool' })
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    // const mockDropEvent = createEvent.drop(uploadArea)
    // Object.defineProperty(mockDropEvent, "dataTransfer", {
    //   value: {
    //     files: [testFile]
    //   }
    // })
    // fireEvent(uploadArea, mockDropEvent)
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile],
      },
    })
    await waitFor(() => {
      expect(screen.queryByText('test.png')).toBeInTheDocument()
      // expect(wrapper.queryByText('check-circle')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'cool',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png',
      })
    )
  })
})
