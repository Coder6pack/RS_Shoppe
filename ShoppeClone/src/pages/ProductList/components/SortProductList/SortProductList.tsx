import classNames from 'classnames'
import { omit } from 'lodash'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { sortBy, order as orderConstant } from 'src/constants/product'
import { ProductListConfig, QueryConfig } from 'src/types/product.type'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit({ ...queryConfig, sort_by: sortByValue }, ['order'])).toString()
    })
  }

  const handleSortSelect = (sortByValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({ ...queryConfig, sort_by: sortBy.price, order: sortByValue }).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-3'>
          <div className=''>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 capitalize  text-center  rounded-sm', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white text black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => {
              handleSort(sortBy.view)
            }}
          >
            phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 capitalize  text-center  rounded-sm', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => {
              handleSort(sortBy.createdAt)
            }}
          >
            mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 capitalize  text-center  rounded-sm', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => {
              handleSort(sortBy.sold)
            }}
          >
            bán chạy
          </button>
          <select
            className={classNames('outline-none h-8 px-4 capitalize  text-left  rounded-sm', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            defaultValue={order || ''}
            onChange={(event) => handleSortSelect(event.target.value)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={orderConstant.asc} className='bg-white text-black'>
              Giá: thấp đến cao
            </option>
            <option value={orderConstant.desc} className='bg-white text-black'>
              Giá: cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex items-center'>
            {page === 1 ? (
              <span className='flex items-center justify-center h-8 w-9 rounded-tl-sm rounded-bl-sm cursor-not-allowed'>
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
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
                }}
                className='flex items-center justify-center h-8 w-9 bg-white rounded-tl-sm rounded-bl-sm'
              >
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
              </Link>
            )}
            {page === pageSize ? (
              <span className='flex items-center justify-center h-8  w-9 rounded-tl-sm rounded-bl-sm cursor-not-allowed'>
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
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
                }}
                className='flex items-center justify-center w-9 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 '
              >
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
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
