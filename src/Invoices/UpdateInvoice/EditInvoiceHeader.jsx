const EditInvoiceHeader = ({ onBack }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-semibold text-gray-800">
        Edit Invoice
      </h1>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>

        <button
          type="submit"
          form="editInvoiceForm"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update & Save
        </button>
      </div>
    </div>
  );
};

export default EditInvoiceHeader;
