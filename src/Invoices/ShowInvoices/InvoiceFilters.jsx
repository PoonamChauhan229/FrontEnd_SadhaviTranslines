const InvoiceFilters = ({
  client,
  status,
  fromDate,
  toDate,
  setClient,
  setStatus,
  setFromDate,
  setToDate,
  applyFilters,
}) => (
  <form onSubmit={applyFilters} className="flex flex-wrap gap-4 my-4">
    <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Client Name" className="border p-2" />
    <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2">
      <option value=""> Status</option>
      <option value="paid">Paid</option>
      <option value="unpaid">Unpaid</option>
    </select>
    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border p-2" />
    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border p-2" />
    <button className="bg-blue-600 text-white px-4 rounded">Apply</button>
  </form>
);

export default InvoiceFilters;
