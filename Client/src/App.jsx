import Chat from "./Components/Chat.jsx"
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'

function App() {



  return (
    <>
   
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </Router>

      
    </>
  )
}

export default App
