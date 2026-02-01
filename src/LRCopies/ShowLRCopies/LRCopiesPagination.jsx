const LRCopiesPagination = ({
  totalItems = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange
}) => {
  // 🛡️ Safety guards
  if (!totalItems || !itemsPerPage) return null;

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / itemsPerPage)
  );

  if (currentPage > totalPages) return null;

  return (
    <div className="flex gap-2 mt-4 justify-center">
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded
              ${currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-white'
              }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default LRCopiesPagination;
