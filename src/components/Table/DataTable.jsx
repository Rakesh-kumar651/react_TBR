import React, { useState } from "react";
import { Table, Dropdown, ButtonGroup } from "react-bootstrap";
import dotIcon from "../../assets/img/icons/more.svg";
import { useDeleteDevice } from "../../hooks/opas/newDevice/useDeleteDevice";
import { useSelector,useDispatch } from "react-redux";
const DataTable = ({ columns, data, sortfilter,type,selectAll,selectedRows,handleSelectAll,handleRowSelect }) => {
    // const [selectedRows, setSelectedRows] = useState([]);
    // const [selectAll, setSelectAll] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0); // first row active
    
    const token = useSelector((state) => state.auth.accessToken);
    const { mutate: deleteDevice, isLoading } = useDeleteDevice();

    const handleRowClick = (index) => {
        setActiveIndex(index);
    };

   
  const handleDelete=(id)=>{
      
     deleteDevice({ id, token });

  }


    return (
        <div className="custom-table">
            <Table hover responsive>
                <thead>
                    <tr>
                        {/* ---- FIRST COLUMN LOGIC ---- */}

                        {sortfilter === "check" ? (
                            <>
                                <th className="d-flex align-items-center">


                                    <label className="custom-check">
                                        <input type="checkbox" checked={selectAll}
                                            onChange={handleSelectAll} />
                                        <span className="checkmark"></span>
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
                        {columns
                        //.filter(col => type === "newdevice" ? col.key !== "status": true)
                        .map((col, index) => (

                            <th key={index}>{col.label}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data
                    .filter(row => type === "newdevice" ? row.key !== "status": true)
                    .map((row, index) => (
                        <tr key={row.deviceId || row.id}
                            className={activeIndex === index ? "active-table-row" : ""}
                            onClick={() => handleRowClick(index)}
                            style={{ cursor: "pointer" }}>
                            {/* ---- FIRST COLUMN CELL ---- */}
                            <td>
                                {sortfilter === "check" ? (
                                    <div className="d-flex align-items-center">
                                        <label className="custom-check">
                                            <input type="checkbox" checked={selectedRows?selectedRows.includes(row.deviceId || row.id):false}
                                                onChange={() => handleRowSelect(row)} />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>


                                ) : sortfilter === "sn" ? (
                                    <span className="td_sn">{index + 1}</span>
                                ) : null}
                            </td>

                            {/* ---- DYNAMIC NORMAL COLUMNS ---- */}
                            {columns.map((col, cIndex) => {
                                // if (col.key === "status" && type==="licenserequest") {
                                //     return (
                                //         <td key={cIndex}>
                                //             <span className={`badge ${row.status == "Generated" ? 'live' : row.status}-badge`}>{row.status}</span>
                                //         </td>
                                //     );
                                // }

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
                                                    <Dropdown.Item onClick={() => handleDelete(row.deviceId || row.id)}>
                                                        Delete
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    );
                                }

                                return <td className="text-truncate" key={cIndex}>{row[col.key] ?? "NA"}</td>
                            })}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DataTable;
