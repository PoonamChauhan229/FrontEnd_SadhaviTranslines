const LRCopiesPagination = ({ totalPages, currentPage, goToPage }) => {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className="flex justify-center mt-4 gap-2 flex-wrap">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-200"
      >
        Next
      </button>
    </div>
  );
};

export default LRCopiesPagination;
