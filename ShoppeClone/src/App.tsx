import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import useRootElement from './useRootElement'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

export default function App() {
  const routesElement = useRootElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <div>
      {routesElement}
      <ToastContainer />
    </div>
  )
}
