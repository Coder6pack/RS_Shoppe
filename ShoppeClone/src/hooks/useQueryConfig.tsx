import { QueryConfig } from 'src/types/product.type'
import useQueryParam from './useQueryParam'
import { isUndefined, omitBy } from 'lodash'

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParam()

  // Khai báo queryConfig để lấy về params handle
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_min: queryParams.price_min,
      price_max: queryParams.price_max,
      name: queryParams.name,
      category: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}
