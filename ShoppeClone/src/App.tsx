import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import useRootElement from './useRootElement'

export default function App() {
  const routesElement = useRootElement()

  return (
    <div>
      {routesElement}
      <ToastContainer />
    </div>
  )
}
