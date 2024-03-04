import React from 'react'

export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-3'>
          <div className=''>Sắp xếp theo</div>
          <button className='h-8 px-4 capitalize bg-orange hover:bg-orange/90 text-center text-white rounded-sm'>
            phổ biến
          </button>
          <button className='h-8 px-4 capitalize bg-white hover:bg-slate-100 text-center text-black rounded-sm'>
            mới nhất
          </button>
          <button className='h-8 px-4 capitalize bg-white hover:bg-slate-100 text-center text-black rounded-sm'>
            bán chạy
          </button>
          <select
            className='outline-none h-8 px-4 capitalize bg-white hover:bg-slate-100 text-left text-black rounded-sm'
            defaultValue=''
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: thấp đến cao</option>
            <option value='price:desc'>Giá: cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='h-8 px-3 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='h-8 px-3 rounded-tr-sm rounded-br-sm bg-white hover:bg-slate-100 cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
