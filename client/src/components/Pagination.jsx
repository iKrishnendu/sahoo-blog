import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`mx-1 p-2 ${
              page === currentPage
                ? "bg-gray-600 text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
