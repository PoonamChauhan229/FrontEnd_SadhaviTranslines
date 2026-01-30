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
}) => {
  return (
    <form
      onSubmit={applyFilters}
      className="bg-white shadow-md rounded-lg p-4 mb-6 overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

        {/* Client */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Client
          </label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Client Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        {/* From Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Apply Button */}
        <div className="lg:col-span-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </form>
  );
};

export default InvoiceFilters;
