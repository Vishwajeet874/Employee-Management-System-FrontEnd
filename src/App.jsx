

import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import Footer from './components/Footer'
import HeaderComponent from './components/HeaderComponent'
import ListEmployee from './components/ListEmployee'
import {BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        <Route path="/" element={ <ListEmployee/> }></Route>
        <Route path="/add-employee" element={ <EmployeeComponent/> }></Route>
        <Route path="/edit-employee/:id" element={ <EmployeeComponent/> }></Route>
      </Routes>
      <Footer/>
    </BrowserRouter> 
    </>
  )
}

export default App
