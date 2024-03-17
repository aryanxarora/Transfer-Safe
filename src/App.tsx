import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import { Start, Loading } from "./components"
import Unlock from "./components/Unlock"

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/unlock" element={<Unlock />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
