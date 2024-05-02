/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange?: (file?: File) => void
}
export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleOnClick = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Dung lượng tối đa là 1Mb,Định dạng: .JPEG, .PNG')
    } else {
      onChange && onChange(fileFromLocal)
    }
  }

  return (
    <>
      <input
        onClick={(event) => {
          ;(event.target as any).value = null
        }}
        ref={fileInputRef}
        onChange={onFileChange}
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
      />
      <button
        onClick={handleOnClick}
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow'
      >
        Chon anh
      </button>
    </>
  )
}
