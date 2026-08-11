import { useRoutes } from "react-router-dom"
import Routes from "./Routes"
import AppContextProvider from "./context/appContext"

const App = () => {

  const router = useRoutes(Routes)

  return (
    <div>
      <AppContextProvider>
        {router}
      </AppContextProvider>
    </div>
  )
}

export default App