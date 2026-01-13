import React, { useState } from "react";
import { Table, Dropdown, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDeleteDevice } from "../../hooks/opas/newDevice/useDeleteDevice";
import { useDownloadSetupFile } from "../../hooks/devicemanagement/useDownloadSetupFile";

const DataTable = ({
  columns,
  data = [],
  sortfilter,
  type,
  selectAll,
  selectedRows,
  handleSelectAll,
  handleRowSelect
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const token = useSelector((state) => state.auth.accessToken);
  const { mutate: deleteDevice } = useDeleteDevice();
  const { mutate: downloadSetup } = useDownloadSetupFile();

  const handleRowClick = (index) => {
    setActiveIndex(index);
  };

  const handleDelete = (id) => {
    deleteDevice({ id, token });
  };

  const handleExport = (row) => {
    const payload = {
      OS: row.os,
      FirmwareName: row.firmwareName,
      Architecture: row.architecture,
      FirmwareVersion: row.firmwareVersion,
      ClusterId: row.clusterId,
      ClusterName: row.clusterName,
      GroupId: row.groupId,
      GroupName: row.groupName,
    };

    downloadSetup(
      { id: row.id, payload, token },
      {
        onSuccess: (res) => {
          if (res?.downloadUrl) {
            downloadFromUrl(
              res.downloadUrl,
              `${row.deviceName || "device"}_setup.zip`
            );
          }
        },
      }
    );
  };

  const downloadFromUrl = (url, fileName) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const colSpanCount =
    columns.length + (sortfilter === "check" || sortfilter === "sn" ? 1 : 0);

  return (
    <div className="custom-table">
      <Table hover responsive>
        <thead>
          <tr>
            {/* FIRST COLUMN */}
            {sortfilter === "check" && (
              <th>
                <label className="custom-check">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  <span className="checkmark"></span>
                </label>
              </th>
            )}

            {sortfilter === "sn" && <th>S.No</th>}

            {/* OTHER COLUMNS */}
            {columns.map((col, index) =>
              type === "newdevice" && col.key === "status" ? null : (
                <th key={index}>{col.label}</th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {/* EMPTY STATE */}
          {data.length === 0 ? (
            <tr>
              <td colSpan={colSpanCount} className="text-center py-4 text-muted">
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row.deviceId || row.id}
                className={activeIndex === index ? "active-table-row" : ""}
                onClick={() => handleRowClick(index)}
                style={{ cursor: "pointer" }}
              >
                {/* FIRST COLUMN CELL */}
                <td>
                  {sortfilter === "check" && (
                    <label className="custom-check">
                      <input
                        type="checkbox"
                        checked={
                          selectedRows?.includes(row.deviceId || row.id) ||
                          false
                        }
                        onChange={() => handleRowSelect(row)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  )}

                  {sortfilter === "sn" && (
                    <span className="td_sn">{index + 1}</span>
                  )}
                </td>

                {/* DATA CELLS */}
                {columns.map((col, cIndex) => {
                  if (
                    col.key === "status" &&
                    (type === "licenserequest" ||
                      type === "deviceStatus" || type === "keyRequestList")
                  ) {
                    return (
                      <td key={cIndex}>
                        <span
                          className={`badge ${
                            row.status == 1
                              ? "live-badge"
                              : "down-badge"
                          }`}
                        >
                          {row.status == 1 ? "live" : "down"}
                        </span>
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
                            {type === "deviceStatus" && (
                              <Dropdown.Item
                                onClick={() => handleExport(row)}
                              >
                                Download Setup File
                              </Dropdown.Item>
                            )}
                            <Dropdown.Item
                              onClick={() =>
                                handleDelete(row.deviceId || row.id)
                              }
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    );
                  }

                  return type === "newdevice" &&
                    col.key === "status" ? null : (
                    <td key={cIndex} className="text-truncate">
                      {row[col.key] ?? "NA"}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
