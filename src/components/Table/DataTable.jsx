import React, { useState } from "react";
import { Table, Dropdown, ButtonGroup } from "react-bootstrap";
import dotIcon from "../../assets/img/icons/more.svg";

const DataTable = ({ columns, data, onEdit, onDelete, sortfilter }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0); // first row active

    const handleRowClick = (index) => {
        setActiveIndex(index);
    };

    const handleSelectAll = () => {
        const allIds = data.map((item) => item.id);
        const newState = !selectAll;

        setSelectAll(newState);
        setSelectedRows(newState ? allIds : []);
    };

    const handleRowSelect = (id) => {
        let updated;

        if (selectedRows.includes(id)) {
            updated = selectedRows.filter((rowId) => rowId !== id);
        } else {
            updated = [...selectedRows, id];
        }

        setSelectedRows(updated);
        setSelectAll(updated.length === data.length);
    };

    return (
        <div className="custom-table">
            <Table hover responsive>
                <thead>
                    <tr>
                        {/* ---- FIRST COLUMN LOGIC ---- */}

                        {sortfilter === "check" ? (
                            <>
                                <th className="d-flex align-items-center">


                                    <label class="custom-check">
                                        <input type="checkbox" checked={selectAll}
                                            onChange={handleSelectAll} />
                                        <span class="checkmark"></span>
                                    </label>
                                </th>
                            </>

                        ) : sortfilter === "sn" ? (
                            <>
                                <th>
                                    S.No
                                </th>
                            </>
                        ) : null}


                        {/* ---- OTHER NORMAL COLUMNS ---- */}
                        {columns.map((col, index) => (
                            <th key={index}>{col.label}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => (
                        <tr key={row.id}
                            className={activeIndex === index ? "active-table-row" : ""}
                            onClick={() => handleRowClick(index)}
                            style={{ cursor: "pointer" }}>
                            {/* ---- FIRST COLUMN CELL ---- */}
                            <td>
                                {sortfilter === "check" ? (
                                    <div className="d-flex align-items-center">
                                        <label class="custom-check">
                                            <input type="checkbox" checked={selectedRows.includes(row.id)}
                                                onChange={() => handleRowSelect(row.id)} />
                                            <span class="checkmark"></span>
                                        </label>

                                    </div>



                                ) : sortfilter === "sn" ? (
                                    <span className="td_sn">{index + 1}</span>
                                ) : null}
                            </td>

                            {/* ---- DYNAMIC NORMAL COLUMNS ---- */}
                            {columns.map((col, cIndex) => {
                                if (col.key === "status") {
                                    return (
                                        <td key={cIndex}>
                                            <span className={`badge ${row.status == "Generated" ? 'live' : row.status.toLowerCase()}-badge`}>{row.status}</span>
                                        </td>
                                    );
                                }

                                if (col.key === "actions") {
                                    return (
                                        <td key={cIndex}>
                                            <Dropdown as={ButtonGroup}>
                                                <Dropdown.Toggle variant="light" size="sm">
                                                  <i className="tkb-more"></i>  
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => onEdit(row)}>
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => onDelete(row)}>
                                                        Delete
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    );
                                }

                                return <td className="text-truncate" key={cIndex}>{row[col.key]}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DataTable;
