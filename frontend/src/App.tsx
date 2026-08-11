import { useRoutes } from "react-router-dom"
import Routes from "./Routes"

const App = () => {

  const router = useRoutes(Routes)

  return (
    <div>
      {router}
    </div>
  )
}

export default App