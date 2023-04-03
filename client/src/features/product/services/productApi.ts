import { api } from 'store/api';
import { Response } from 'common/types/http';
import {
  Category,
  Order,
  Product,
  ProductSearchRes,
} from '../models/productModels';

const apiWithTags = api.enhanceEndpoints({
  addTagTypes: ['Category', 'Order', 'Product', 'Search'],
});

export const productApi = apiWithTags.injectEndpoints({
  endpoints: (build) => ({
    /**
     *  Product API ./api/product
     */

    // Get a product list
    // GET /product
    getProducts: build.query<Product[], {}>({
      query: () => ({
        url: 'product',
      }),
      transformResponse: (res: Response<Product[]>) => res?.data,

      /**
       * Provides a list of `Product` by `id`.
       * If any mutation is executed that `invalidate`s any of these tags,
       * this query will re-run to be always up-to-date.
       *
       * The `LIST` id is a "virtual id" we just made up to be able to
       * invalidate this query specifically if a new `Product` element was added.
       */
      providesTags: (result) =>
        result
          ? // successful query
            [
              ...result.map(
                ({ _id: id }) => ({ type: 'Product', id } as const)
              ),
              { type: 'Product', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query
            // when `{ type: 'Product', id: 'LIST' }` is invalidated
            [{ type: 'Product', id: 'LIST' }],
    }),

    // Get product by id
    // GET /product/[id]
    getProduct: build.query<Product, string>({
      query: (productId: string) => ({
        url: `product/${productId}`,
      }),
      transformResponse: (res: Response<Product>) => res.data,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    // // Create a new product
    // // POST /product
    // createProduct: build.mutation<Product, Partial<Product>>({
    //   query: (product) => ({
    //     url: 'product',
    //     method: 'POST',
    //     body: product,
    //   }),
    //   transformResponse: (res: Response<Product>) => res.data,

    //   /**
    //    * Invalidates all queries that subscribe to this Post `id` only.
    //    * In this case, `getProduct` will be re-run.
    //    * `getProducts` *might* rerun, if this id was under its results.
    //    */
    //   invalidatesTags: (result, error, { _id: id }) => [
    //     { type: 'Product', id },
    //   ],
    // }),

    // // Delete product by id
    // // DELETE /product/[id]
    // deleteProduct: build.mutation<string, string>({
    //   query: (productId: string) => ({
    //     url: `product/${productId}`,
    //     method: 'DELETE',
    //   }),
    //   transformResponse: (res: Response<{ _id: string }>) => res.data._id,

    //   // Invalidates all queries that subscribe to this Product `id` only.
    //   invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
    // }),

    /**
     *  Product Category API ./api/product/category
     */

    // Get a category list
    // GET /product/category
    getCategories: build.query<Category[], {}>({
      query: () => ({
        url: 'product/category',
      }),
      transformResponse: (res: Response<Category[]>) => res?.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ _id: id }) => ({ type: 'Category', id } as const)
              ),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),

    // Get a Category by id
    // GET /product/category/[id]
    getCategory: build.query<Category, string>({
      query: (categoryId: string) => ({
        url: `product/category/${categoryId}`,
      }),
      transformResponse: (res: Response<Category>) => res.data,
      providesTags: (result, error, id) => [{ type: 'Category', id }],
    }),

    // Search Product
    // GET /product/search/[query]
    search: build.query<ProductSearchRes, string>({
      query: (query: string) => ({
        url: `product/search/${query}`,
      }),
      transformResponse: (res: Response<ProductSearchRes>) => res.data,
      providesTags: (result, error, id) => [{ type: 'Search', id }],
    }),

    /**
     *  Order API ./api/order
     */

    // Create a new order
    // POST /api/order
    createOrder: build.mutation<Order, Partial<Order>>({
      query: (order) => ({
        url: 'order',
        method: 'POST',
        body: order,
      }),
      transformResponse: (res: Response<Order>) => res.data,
      invalidatesTags: (result, error, { _id: id }) => [{ type: 'Order', id }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetProductQuery,
  useGetProductsQuery,
  useLazySearchQuery,
  useCreateOrderMutation,
  // useCreateProductMutation,
  // useDeleteProductMutation,
} = productApi;
