import { useContext, lazy, Suspense } from 'react'
import { AppContext } from './contexts/app.context'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/layout/UserLayout'
// import Login from './pages/Login'
// import ProductList from './pages/ProductList'
// import Register from './pages/Register'
// import ProductDetail from './pages/ProductDetail'
// import Cart from './pages/Cart'
// import ChangePassword from './pages/User/ChangePassword'
// import HistoryPurchase from './pages/User/HistoryPurchase'
// import Profile from './pages/User/Profile'
// import NotFound from './pages/NotFound'

const Login = lazy(() => import('./pages/Login'))
const ProductList = lazy(() => import('./pages/ProductList'))
const Register = lazy(() => import('./pages/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const HistoryPurchase = lazy(() => import('./pages/User/HistoryPurchase'))
const ChangePassword = lazy(() => import('./pages/User/HistoryPurchase'))
const Profile = lazy(() => import('./pages/User/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Cart = lazy(() => import('./pages/Cart'))

function ProtectedRoutes() {
  const { isAuthenticated } = useContext(AppContext)
  console.log(isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  console.log(isAuthenticated)

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRootElement() {
  const routeElements = useRoutes([
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoutes />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElements
}
