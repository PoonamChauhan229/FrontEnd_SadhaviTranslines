
import { Route ,Routes} from 'react-router-dom'
import './App.css'
import CreateInvoice from './CreateInvoice'
import SideBar from './SideBar'
import { useState } from 'react'
import ViewInvoices from './ViewInvoices'
import EditInvoice from './EditInvoice'


export default function App() {
 const [globalCxt,setGlobalCxt]=useState({
  open:true
 })
  return (
    <>
     <div className="flex font-mono">
     
      <SideBar/>
     
    </div>
    <Routes>
        <Route path='/createinvoices' element={<CreateInvoice/>}/>
        <Route path='/viewinvoice' element={<ViewInvoices/>}/>
        <Route path='/editinvoice/:id' element={<EditInvoice/>}/>
      </Routes>
    </>
  )
}