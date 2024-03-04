import { SuccessResponse } from './../types/ultils.type'
import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import http from 'src/utils/http'

const URL = 'products'
const productApi = {
  getProducts: (params: ProductListConfig) =>
    http.get<SuccessResponse<ProductList>>(URL, {
      params: params
    }),
  getProduct: (id: string) => http.get<SuccessResponse<Product>>(`${URL}/${id}`)
}

export default productApi
