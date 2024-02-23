import useRootElement from './useRootElement'

export default function App() {
  const routesElement = useRootElement()

  return <div>{routesElement}</div>
}
