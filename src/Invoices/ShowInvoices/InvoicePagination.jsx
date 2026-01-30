const InvoicePagination = ({ totalPages, currentPage, goToPage }) => {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className="flex justify-center items-center mt-4 gap-2 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md font-medium transition 
          ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-blue-100"}
        `}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 rounded-md font-medium transition 
            ${page === currentPage ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-blue-100"}
          `}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md font-medium transition 
          ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-blue-100"}
        `}
      >
        Next
      </button>
    </div>
  );
};

export default InvoicePagination;
