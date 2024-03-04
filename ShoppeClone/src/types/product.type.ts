import { order, sortBy } from './../constants/product'

export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: typeof sortBy
  order?: typeof order
  exclude?: string
  rating_filter?: number | string
  price_min?: number | string
  price_max?: number | string
  name?: string
}

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
