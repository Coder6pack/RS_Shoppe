import React, { useState } from 'react'
import SortProductList from './components/SortProductList'
import Product from './components/Product'
import AsideFilter from './components/AsideFilter'
import useQueryParam from 'src/hooks/useQueryParam'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'

export default function ProductList() {
  const queryParams = useQueryParam()
  const [page, setPage] = useState(1)
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productApi.getProducts(queryParams)
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {data && data.data.data.products.map((product) => <Product key={product._id} product={product} />)}
            </div>
            <Pagination page={page} setPage={setPage} pageSize={20} />
          </div>
        </div>
      </div>
    </div>
  )
}
