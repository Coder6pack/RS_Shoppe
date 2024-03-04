import React from 'react'
import classNames from 'classnames'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}
const RANGE = 2
export default function Pagination({ page, pageSize, setPage }: Props) {
  let dotAfter = false
  let dotBefore = false
  const renderDotAfter = (index: number) => {
    if (!dotAfter) {
      dotAfter = true
      return (
        <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'>
          ...
        </button>
      )
    }
    return null
  }
  const renderDotBefore = (index: number) => {
    if (!dotBefore) {
      dotBefore = true
      return (
        <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'>
          ...
        </button>
      )
    }
    return null
  }
  const renderPaginate = () => {
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + 2 && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <button
            key={index}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }
  return (
    <div className='flex justify-center flex-wrap mt-6'>
      <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>Prev</button>
      {renderPaginate()}
      <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>Next</button>
    </div>
  )
}
