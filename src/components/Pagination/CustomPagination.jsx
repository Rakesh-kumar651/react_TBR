import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange
}) {
  const [goPage, setGoPage] = useState(currentPage);

  const changePage = (num) => {
    if (num >= 1 && num <= totalPages) {
      onPageChange(num);
      setGoPage(num);
    }
  };

  if (totalPages <= 1) return null;

  // visible page numbers (1–5 logic)
  const visiblePages = [];
  for (let i = 1; i <= Math.min(5, totalPages); i++) {
    visiblePages.push(i);
  }

  return (
    <div className="px-2 d-flex gap-3 justify-content-end align-items-center flex-wrap custom-pagination">

      {/* Pagination */}
      <Pagination className="mb-0">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        />

        {visiblePages.map((num) => (
          <Pagination.Item
            key={num}
            active={num === currentPage}
            onClick={() => changePage(num)}
          >
            {num}
          </Pagination.Item>
        ))}

        {totalPages > 5 && <Pagination.Ellipsis disabled />}

        {totalPages > 5 && (
          <Pagination.Item
            active={currentPage === totalPages}
            onClick={() => changePage(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        )}

        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
        />
      </Pagination>

      {/* Go To Page */}
      <div className="go-input-group">
        <span className="page-total">
          <input
            type="number"
            className="page-go-input br-none"
            min={1}
            max={totalPages}
            value={goPage}
            onChange={(e) => setGoPage(Number(e.target.value))}
          />{" "}
          / {totalPages}
        </span>
        <button
          className="ms-2 page-go-btn"
          onClick={() => changePage(goPage)}
        >
          Go
        </button>
      </div>
    </div>
  );
}
