import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { ProductListConfig, Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'

export default function ProductDetail() {
  // Lay nameId tren URL
  const { nameId } = useParams()

  // Lay Id qua nameId
  const id = getIdFromNameId(nameId as string)

  // Lay data qua API
  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProduct(id as string)
  })

  // Tao bien de rut gon data
  const product = productDetailData?.data.data

  // Tao state khoi tao cho slide
  const [currentIndexImg, setCurrentIndexImg] = useState([0, 5])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentImg = useMemo(
    () => (product ? product.images.slice(...currentIndexImg) : []),
    [product, currentIndexImg]
  )
  // tao state quan ly quantity product

  const [buyCount, setBuyCount] = useState(1)

  // Tao state de active vao anh
  const [activeImg, setActiveImg] = useState('')

  const imgRef = useRef<HTMLImageElement>(null)

  // Chon anh dau tien khi load
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImg(product.images[0])
    }
  }, [product])

  // Tao queryConfig de lay danh sach lien quan
  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }

  // Lay data cua danh sach lien quan qua API
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 100
  })

  // handle active khi onClick
  const choseActive = (img: string) => {
    setActiveImg(img)
  }

  // handle next Img khi onClick
  const next = () => {
    if (currentIndexImg[1] < (product as ProductType).images.length) {
      setCurrentIndexImg((prev) => {
        return [prev[0] + 1, prev[1] + 1]
      })
    }
  }

  // handle prev Img khi onClick
  const prev = () => {
    if (currentIndexImg[0] > 0) {
      setCurrentIndexImg((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  // handle zoomImg khi mouseMove
  const handleZoom = (event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const image = imgRef.current as HTMLImageElement
    const rect = event.currentTarget.getBoundingClientRect()
    const { naturalHeight, naturalWidth } = image
    // get offsetX and offsetY
    const offSetY = event.pageY - (rect.y + window.scrollY)
    const offSetX = event.pageX - (rect.x + window.scrollX)
    const top = offSetY * (1 - naturalHeight / rect.height)
    const left = offSetX * (1 - naturalWidth / rect.width)

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  // handle remove zoomImg khi mouseLeave
  const handleRemoveZoom = () => {
    imgRef.current?.removeAttribute('style')
  }

  // tao function handleBuyCount quan ly count quantity
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  // check product
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] shadow overflow-hidden cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImg}
                  alt={product.name}
                  ref={imgRef}
                  className='absolute pointer-events-none top-0 left-0 h-full w-full bg-white object-cover'
                />
              </div>
              <div className='relative grid grid-cols-5 gap-1 mt-4'>
                <button
                  onClick={next}
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImg.map((img) => {
                  const isActive = img === activeImg
                  return (
                    <div className='relative w-full pt-[100%]' key={img}>
                      <img
                        src={img}
                        alt={product.name}
                        onClick={() => choseActive(img)}
                        className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                        aria-hidden={true}
                      />
                      {isActive && <div className='absolute border inset-0 border-orange'></div>}
                    </div>
                  )
                })}
                <button
                  onClick={prev}
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                {/* Show rating start of product */}
                <div className='flex items-center mr-4'>
                  <span className='mr-1 border-b border-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='fill-orange text-orange h-4 w-4'
                    nonActiveClassName='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                {/* Show Number sold*/}
                <div className='border-l border-gray-300 pl-3'>
                  <span className='text-gray-500'>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              {/* Show price space*/}
              <div className='mt-8 flex items-center px-5 py-4 bg-gray-50'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='text-orange ml-3 text-3xl font-medium'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-md bg-orange px-2 py-1 text-sx uppercase font-semibold text-white'>
                  {rateSale(product.price_before_discount, product.price)} Giảm
                </div>
              </div>
              {/* Show quantity ,plus and minus */}
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='mt-8 bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 capitalize p-4 text-lg text-slate-700'>Mô tả sản phẩm</div>
            <div
              className='mx-4 mt-12 mb-4 text-sm leading-loose'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>có thể bạn cũng thích</div>
          <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
            {productsData &&
              productsData.data.data.products.map((product) => <Product key={product._id} product={product} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
