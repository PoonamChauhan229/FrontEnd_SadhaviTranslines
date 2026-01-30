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
      className="bg-white shadow-md rounded-lg p-4 mb-6 overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            LR No
          </label>
          <input
            type="text"
            value={lrNo}
            onChange={(e) => setLrNo(e.target.value)}
            placeholder="LR Number"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Vehicle No
          </label>
          <input
            type="text"
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value)}
            placeholder="Vehicle Number"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="lg:col-span-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default LRCopiesFilters;
