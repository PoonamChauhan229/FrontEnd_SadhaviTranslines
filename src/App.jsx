import { Routes, Route } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
// import CreateInvoice from "./Invoices/CreateInvoice";
import CreateInvoice from './Invoices/AddInvoice/CreateInvoice'
import ViewInvoices from './Invoices/ShowInvoices/ViewInvoices'
// import EditInvoice from "./Invoices/EditInvoice";
import { useState } from "react";
import EditInvoice from "./Invoices/UpdateInvoice/EditInvoice";

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    // <div className="flex w-screen overflow-x-hidden">
    <div className="w-full min-h-screen overflow-x-hidden">

      {/* Sidebar */}
      <SideBar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 min-w-0 transition-all duration-300 ${
          open ? "ml-72" : "ml-[78px]"
        }`}
      >
        <Navbar open={open} />

        <div className="mt-12 p-4 overflow-x-hidden">
          <Routes>
            <Route path="/createinvoices" element={<CreateInvoice />} />
            <Route path="/viewinvoice" element={<ViewInvoices />} />
            {/* <Route path="/editinvoice/:id" element={<EditInvoice />} /> */}
             <Route path="/editinvoice/:id" element={<EditInvoice />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

