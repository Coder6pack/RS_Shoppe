import { Link } from 'react-router-dom'
import Popover from '../Popover'
import path from 'src/constants/path'
import authApi from 'src/apis/auth.api'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'src/main'
import { purchasesStatus } from 'src/constants/purchase'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

export default function NavHeader() {
  const { isAuthenticated, setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='flex justify-end text-white mb-6'>
      <Popover
        as='div'
        className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
        renderPopover={
          <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
            <div className='flex flex-col py-2 pr-28 pl-3'>
              <button className='py-2 px-3 hover:text-orange mb-2'>Tiếng việt</button>
              <button className='py-2 px-3 hover:text-orange'>English</button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <div className='mx-1'>Tiếng Việt</div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated && (
        <Popover
          as='div'
          className='flex items-center py-1 hover:text-gray-300 cursor-pointer flex-shrink-0'
          renderPopover={
            <div className='bg-white text-left relative shadow-md rounded-sm border border-gray-200'>
              <Link to={path.home} className='w-full block py-3 px-5 hover:bg-slate-100 hover:text-cyan-500'>
                Tài khoản của tôi
              </Link>
              <Link to={path.home} className='w-full block py-3 px-5 hover:bg-slate-100 hover:text-cyan-500'>
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='w-full block py-3 px-5 hover:bg-slate-100 hover:text-cyan-500 text-left'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='w-6 h-6 flex-shrink-0 mr-2 ml-3'>
            <img
              className='rounded-full w-full h-full object-cover'
              src='https://down-vn.img.susercontent.com/file/81062507f28572b13b414f009e8a10d0_tn'
              alt='avatar'
            />
          </div>
          <div className='ml-1'>{profile?.name}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            đăng ký
          </Link>
          <div className='mx-3 border-r-[1px] border-white/40 h-4'></div>
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
