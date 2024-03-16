import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import { AppContext } from './contexts/app.context'
import path from './constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/layout/UserLayout'
import ChangePassword from './pages/User/ChangePassword'
import HistoryPurchase from './pages/User/HistoryPurchase'

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
          <ProductList />
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
              <Cart />
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
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
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
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
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
          <ProductDetail />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
