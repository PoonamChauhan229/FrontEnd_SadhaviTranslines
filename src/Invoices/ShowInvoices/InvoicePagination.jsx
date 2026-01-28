const InvoicePagination = ({ totalPages, currentPage, goToPage }) => (
  <div className="flex justify-center mt-4 gap-2">
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => goToPage(i + 1)}
        className={`px-3 py-1 ${
          i + 1 === currentPage ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

export default InvoicePagination;
