import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Download from './pages/Download'

function App() {
  return (
    // <Home />
    <Routes>
      <Route exact index element={<Home />}></Route>
      <Route exact path="/quiz" element={<Quiz />}></Route>
      <Route exact path="/result" element={<Result />}></Route>
      <Route exact path="/download" element={<Download />}></Route>
    </Routes>
  )
}

export default App
