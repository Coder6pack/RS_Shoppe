import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/ultils.type'
import { userSchema, UserSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: userApi.getProfile
  })

  const profile = data?.data
  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const handleOnSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync({ ...data })
      reset()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          // dung Object de tao vong lap cac key trong form error
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className='border-b border-gray-200 pb-20 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Thay đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quan Ly Thong Tin Ho So De Bao Mat Tao Khoan</div>
      </div>
      <form onSubmit={handleOnSubmit} className='mt-8 mr-auto max-w-2xl'>
        <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
          <div className='flex flex-col sm:flex-row flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.data.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Nhập mật khẩu cũ</div>
            <div className='w-[80%] pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='password'
                type='password'
                placeholder='Nhập mật khẩu cũ'
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Nhập mật khẩu mới</div>
            <div className='w-[80%] pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                type='password'
                name='new_password'
                placeholder='Nhập mật khẩu mới'
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Nhập lại mật khẩu</div>
            <div className='w-[80%] pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                type='password'
                name='confirm_password'
                placeholder='Nhập lại mật khẩu'
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>
          <div className='mt-4 flex flex-wrap flex-col sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize' />
            <div className='w-[80%] pl-5'>
              <Button className='flex items-center h-9 bg-orange px-5 text-center text-s text-white hover:bg-orange/80'>
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
