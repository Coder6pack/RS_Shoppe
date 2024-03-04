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
  paginate: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: number
  limit?: number
  sort_by?: typeof sortBy
  order?: typeof order
  exclude?: string
  rating_filter?: number
  price_min?: number
  price_max?: number
  name?: string
}
