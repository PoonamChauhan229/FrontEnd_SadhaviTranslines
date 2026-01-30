import axios from "axios";
import { useEffect, useState } from "react";
import { url } from '../../utils/constants'
import usePagination from "../../utils/usePagination";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceFilters from "./InvoiceFilters";
import InvoiceTable from "./InvoiceTable";
import InvoicePagination from "./InvoicePagination";
import * as XLSX from "xlsx";

const ViewInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  const [client, setClient] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    axios.get(`${url}/viewinvoices`).then((res) => {
      setInvoices(res.data);
      setFilteredInvoices(res.data);
    });
  }, []);

 const applyFilters = (e) => {
  e.preventDefault();

  let data = [...invoices];
  console.log(data)
  // Client filter (use clientName)
  if (client) {
    data = data.filter((i) =>
      i.clientName?.toLowerCase().includes(client.toLowerCase())
    );
  }

  // Status filter (use payment_status)
  if (status) {
    data = data.filter(
      (i) => i.payment_status?.toLowerCase() === status.toLowerCase()
    );
  }

  // From date
  if (fromDate) {
    data = data.filter(
      (i) => new Date(i.date_lr) >= new Date(fromDate)
    );
  }

  // To date
  if (toDate) {
    data = data.filter(
      (i) => new Date(i.date_lr) <= new Date(toDate)
    );
  }

  setFilteredInvoices(data);
  goToPage(1)
};


  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredInvoices);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");
    XLSX.writeFile(workbook, "invoices.xlsx");
  };

  const { paginatedData, currentPage, totalPages, goToPage } =
    usePagination(filteredInvoices, 5);

  return (
    <div className="max-w-full overflow-x-hidden px-4">
    <div className="mx-auto p-4 shadow-lg rounded-lg">
        <InvoiceHeader exportToExcel={exportToExcel} />

        <InvoiceFilters
          client={client}
          status={status}
          fromDate={fromDate}
          toDate={toDate}
          setClient={setClient}
          setStatus={setStatus}
          setFromDate={setFromDate}
          setToDate={setToDate}
          applyFilters={applyFilters}
        />

        <InvoiceTable
          currentPage={currentPage}
          paginatedData={paginatedData}
          onDeleteSuccess={(id) => {
            setFilteredInvoices(prev => prev.filter(inv => inv._id !== id));
          }}
        />


        <InvoicePagination
          totalPages={totalPages}
          currentPage={currentPage}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};

export default ViewInvoices;
