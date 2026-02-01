const LRCopiesFilters = ({
  lrNo,
  vehicleNo,
  fromDate,
  toDate,
  setLrNo,
  setVehicleNo,
  setFromDate,
  setToDate,
  applyFilters,
}) => {
  return (
    <form
      onSubmit={applyFilters}
      className="bg-white shadow-md rounded-lg p-4 mb-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label className="text-sm font-medium">LR No</label>
          <input
            value={lrNo}
            onChange={(e) => setLrNo(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Vehicle No</label>
          <input
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm font-medium">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm font-medium">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="lg:col-span-4 text-right">
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Apply Filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default LRCopiesFilters;
