import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Layout from './layout/Layout'
import Employees from './pages/employees/Employees'

import { EmployeeProvider } from './pages/employees/EmployeesContext'

function App() {
  return (
    <Router>
      <Layout>
        <EmployeeProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
          </Routes>
        </EmployeeProvider>
      </Layout>
    </Router>
  )
}

export default App
