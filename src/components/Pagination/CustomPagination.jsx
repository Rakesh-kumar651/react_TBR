import React, { useState } from "react";
import { Pagination, Button, Form, InputGroup } from "react-bootstrap";

export default function CustomPagination() {
    const [page, setPage] = useState(1);
    const totalPages = 9;

    const changePage = (num) => {
        if (num >= 1 && num <= totalPages) {
            setPage(num);
        }
    };

    return (
        <div className="px-2 d-flex gap-3 justify-content-end align-items-center flex-wrap custom-pagination">

            {/* Pagination */}
            <Pagination className="mb-0 ">
                <Pagination.Prev disabled={page === 1} onClick={() => changePage(page - 1)} />

                {/* Page numbers */}
                {[1, 2, 3, 4, 5].map((num) => (
                    <Pagination.Item
                        key={num}
                        active={num === page}
                        onClick={() => changePage(num)}
                    >
                        {num}
                    </Pagination.Item>
                ))}

                {/* Dots */}
                <Pagination.Ellipsis disabled />

                {/* Last Page */}
                <Pagination.Item
                    active={page === totalPages}
                    onClick={() => changePage(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>

                <Pagination.Next
                    disabled={page === totalPages}
                    onClick={() => changePage(page + 1)}
                />
            </Pagination>

            {/* Go To Page */}
            <div className="go-input-group"><span className="page-total"><input type="number" className="page-go-input br-none" min={1} max={9} defaultValue={1} /> / 9</span>
                <button className="ms-2 page-go-btn">Go</button>
            </div>

            {/* <InputGroup style={{ width: "130px" }}>
        <Form.Control
          type="number"
          min="1"
          max={totalPages}
          value={page}
          onChange={(e) => changePage(Number(e.target.value))}
        />
        <Button variant="primary" onClick={() => changePage(page)}>
          Go
        </Button>
      </InputGroup> */}

        </div>
    );
}
