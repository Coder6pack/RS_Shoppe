import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'

export default function AsideFilter() {
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5 mr-1 fill-current'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
          />
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 text-orange font-semibold'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4 fill-orange absolute left-[-10px]'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
            </svg>
            Thời trang nam
          </Link>
        </li>
        <li className='py-2 pl-3'>
          <Link to={path.home} className='relative px-2'>
            Phone Call
          </Link>
        </li>
      </ul>
      <div className='flex items-center font-semibold mt-4 uppercase'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4 fill-current stroke-current mr-2'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
          />
        </svg>
        bộ lọc tìm kiếm
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div className=''>Khoảng giá</div>
        <form className='mt-2'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow'
              name='form'
              placeholder='Từ'
              classNameInput='p-1 rounded-sm border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full outline-none'
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Input
              type='text'
              className='grow'
              name='form'
              placeholder='Đến'
              classNameInput='p-1 rounded-sm border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full outline-none'
            />
          </div>
          <Button className='w-full p-2 uppercase bg-orange text-white hover:bg-orange/90 flex items-center justify-center'>
            Áp dụng
          </Button>
        </form>
        <div className='bg-gray-300 h-[1px] my-4' />
        <div>Đánh giá</div>
        <ul className='my-3'>
          <li className='py-1 pl-4'>
            <Link to='' className='flex items-center'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg key={index} viewBox='0 0 9.5 8' className='w-4 h-4 mr-1'>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset='0' stopColor='#ffca11'></stop>
                        <stop offset='1' stopColor='#ffad27'></stop>
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      ></polygon>
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth='1'>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar'></use>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
              <span className='ml-1'>Trở lên</span>
            </Link>
          </li>
          <li className='py-1 pl-4'>
            <Link to='' className='flex items-center'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg key={index} viewBox='0 0 9.5 8' className='w-4 h-4 mr-1'>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset='0' stopColor='#ffca11'></stop>
                        <stop offset='1' stopColor='#ffad27'></stop>
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      ></polygon>
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth='1'>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar'></use>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
              <span className='ml-1'>Trở lên</span>
            </Link>
          </li>
        </ul>
        <div className='bg-gray-300 h-[1px] my-4' />
        <Button className='w-full p-2 uppercase bg-orange text-white hover:bg-orange/90 flex items-center justify-center'>
          xoá tất cả
        </Button>
      </div>
    </div>
  )
}
