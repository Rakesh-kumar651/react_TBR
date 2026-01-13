import React, { useState,useEffect,useCallback } from "react";
import { Button, ToastContainer } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import gatewayIcon from "./../../assets/img/icons/gateway-icon.svg";
import acendingIcon from "./../../assets/img/icons/acending-sort.svg";
import ImportDevicesModal from '../Modal/ImportDevicesModal'
import DataTable from "../Table/DataTable";
import CustomPagination from "../Pagination/CustomPagination";
import ClusterModal from "../Modal/ClusterModal";
import ReusableSelect from "../Forms/Selectbox";
import GetLicenseModal from "../Modal/GetLicenseModal";
import SearchExpand from "../Forms/SearchExpand";
import { AppToast } from "../../components/toast";
import { useDevicesAll } from "../../hooks/opas/newDevice/useDevicesAll";
import { useLicenserequestedDevices } from "../../hooks/opas/licenseRequest/useLicenserequestedDevices";
import { useInitializeDevice } from "../../hooks/opas/newDevice/useInitializeDevice";
import { useImportDevices } from "../../hooks/opas/licenseRequest/useImportDevices";

import { Type } from "react-bootstrap-icons";


const PAGE_SIZE = 10;

const NewDeviceTab = ({ tapType }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [payloadJson, setPayloadJson] = useState([])
  const [show, setShow] = useState(false);
  const [showImport, setImportShow] = useState(false);
  const [showLicense, setShowLicense] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [allIds, setallIds] = useState([])
  const { mutate, isLoadingInialize, isSuccess, isErrorInialize, error } = useInitializeDevice();
  const { mutate: importDevices, isPending, importError } = useImportDevices();
  const [sortField, setSortField] = useState("CreatedAt");
const [sortOrder, setSortOrder] = useState("desc"); // default
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });
  const handleInitializeSubmit = () => {
    if (!selectedRows.length) return;

    const payload = tableData
      .filter(item => selectedRows.includes(item.deviceId))
      .map(item => ({
        deviceId: item.deviceId,
        deviceName: item.name,      // ✅ correct key
        LicensePath: item.licensePath     // ✅ correct case
      }));

    mutate(
      { payload, token },   // token only here
      {
        onSuccess: () => {


          //setErrorMessage(false);

          setToast({
            show: true,
            message: "Device initialize successfully",
            type: "success"
          });
        },
        onError: (data) => {


          //setErrorMessage(false);
          setToast({
            show: true,
            message: data.response.data.title || "An error occurred",
            type: "error"
          });
        }
      }
    );
  };



const resetToDefault = useCallback(() => {
  setPage(1);
  setSortField("CreatedAt");
  setSortOrder("desc");
  setSearch("");
}, []);

useEffect(() => {
  resetToDefault();
}, [tapType]);



  const handleSortToggle = () => {
  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  setPage(page); // reset pagination
};

  const handleSelectAll = () => {

    const newState = !selectAll;
    const ids = tableData.map(item => item.deviceId);
    setallIds(ids);
    setSelectAll(newState);
    setSelectedRows(newState ? ids : []);
  };

  const handleRowSelect = (row) => {
    let updated;

    if (selectedRows.includes(row.deviceId)) {
      updated = selectedRows.filter((rowId) => rowId !== row.deviceId);
    } else {
      updated = [...selectedRows, row.deviceId];
    }

    setSelectedRows(updated);


    setSelectAll(updated.length === data?.items.length);


  };



  const { data, isLoading, isError } = tapType === 'newdevice' ? useDevicesAll({
    page,
    limit: PAGE_SIZE,
    sortField: sortField,
    sortOrder: sortOrder,
    search,
    token
  }) : useLicenserequestedDevices({
    page,
    limit: PAGE_SIZE,
    sortField: sortField,
    sortOrder: sortOrder,
    search,
    token
  });




  const tableData = data?.items || [];
  const totalPages = data?.totalPages || 0;

  const columns = [
  { label: "Device Name", key: "name" },
  tapType !== "newdevice"
    ? { label: "Group Name", key: "groupName" }
    : null,
  { label: "Serial Number", key: "serialNumber" },
  { label: "OS", key: "os" },
  { label: "Firmware", key: "firmwareName" },
  { label: "Architecture", key: "architecture" },
  { label: "Status", key: "status" },
  { label: "Action", key: "actions" }
].filter(Boolean);

  const handleSearch = (text) => {
    setSearch(text);
    setPage(page); // reset page on search
  };

  //if (isLoading) return <p>Loading devices...</p>;
  if (isError) {
    // dispatch(logout());
    // navigate
    navigate("/");
  }


  const bulkImportDevices = (file) => {
    console.log("JSON from file:", file);

    importDevices(
      { file, token },
      {
        onSuccess: () => {
          setImportShow(false)

          //setErrorMessage(false);
          setToast({
            show: true,
            message: "Devices import successfully",
            type: "success"
          });

        }, onError: (data) => {
          setImportShow(false)

          //setErrorMessage(false);
          setToast({
            show: true,
            message: data.response.data.message || "An error occurred",
            type: "error"
          });
        }

      }
    )
  };

  return (

    <div>
      {/* HEADER */}
      <div className="mb-4">
        <div className="sub-card-header d-flex justify-content-between flex-wrap gap-2">
          <h2 className="card-title d-flex align-items-center gap-2">
            <img src={gatewayIcon} alt="gateway" className="card-title-img" />
            Device list
          </h2>

          <div className="filter-container flex-wrap">
            {tapType === 'newdevice' ? (
              <>



                <Button size="sm" variant="dark" className="rounded-pill" onClick={() => setShowGroup(true)}>
                  Create group
                </Button>
                <Button size="sm" variant="dark" className="rounded-pill" onClick={() => setShow(true)}>
                  Create cluster
                </Button>
                <Button size="sm" variant="dark" className="rounded-pill" onClick={() => setShowLicense(true)}>
                  Get license
                </Button>
                <ReusableSelect
                  mode="multiple"
                  placeholder="All status"
                  options={[
                    { value: "hpc", label: "HPC" },
                    { value: "rule", label: "Rule Data" }
                  ]}
                /></>) : (
              <>
                <span className='d-inline-block'>
                  <Button size='sm' variant='dark' className='rounded-pill' onClick={handleInitializeSubmit}>Initialize</Button>
                </span>
                <span className='d-inline-block'>
                  <Button size='sm' variant='dark' className='rounded-pill' onClick={() => setImportShow(true)}>Import devices</Button>
                </span>


                <span className='d-inline-block'>
                  <ReusableSelect
                    mode="single"
                    placeholder="Select Status"
                    options={[
                      { value: "all", label: "All" },
                      { value: "completed", label: "Completed" },
                    ]}
                    onChange={(v) => console.log("Selected:", v)}
                  />
                </span>
                <span className='d-inline-block'>
                  <ReusableSelect
                    mode="single"
                    placeholder="Select IP"
                    options={[
                      { value: "20251015.1", label: "20251015.1" },
                      { value: "20251015.2", label: "20251015.12" },
                    ]}
                    onChange={(v) => console.log("Selected:", v)}
                  />
                </span>

              </>
            )
            }

            <span className='d-inline-block'>
                  <ReusableSelect
                    mode="single"
                    placeholder="Sort by"
                    options={[
  { label: "Created Date", value: "createdAt" },
  { label: "Firmware Name", value: "firmwareName" },
  { label: "Board Name", value: "boardName" },
  { label: "OS Name", value: "os" },
]}
                    onChange={(v) => setSortField(v.value)}
                  />
                </span>
            <SearchExpand onSearch={handleSearch} />
            
            <a className="actionbtn actionbtn-outline" onClick={handleSortToggle} role="button">
              <img src={acendingIcon} alt="sort"  className={`sort-icon ${sortOrder}`}/>
            </a>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="sub-card-body">
        <DataTable columns={columns} data={tableData} sortfilter="check" type={tapType} selectAll={selectAll} selectedRows={selectedRows} handleSelectAll={handleSelectAll} handleRowSelect={handleRowSelect} />
      </div>

      {/* PAGINATION */}
      <CustomPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* MODALS */}
      <ClusterModal
        show={show}
        onHide={() => setShow(false)}
        label="Cluster Name"
        inputLabel="Cluster name"
        buttonText="Create"
        keyName='clusterName'
      />

      <ClusterModal
        show={showGroup}
        onHide={() => setShowGroup(false)}
        label="Create Group"
        inputLabel="Group name"
        buttonText="Create"
        keyName='groupName'
      />

      <GetLicenseModal
        show={showLicense}
        onHide={() => setShowLicense(false)}
        selectedRows={selectedRows}
        totalDevices={data?.totalEntries < 10 ? "0" + data?.totalEntries || 0 : data?.totalEntries || 0}
      />

      <ImportDevicesModal
        show={showImport}
        onHide={() => setImportShow(false)}

        title="Import License Device"

        primaryButtonLabel="Save"
        secondaryButtonLabel="Cancel"

        dropZone={true}  // enable file uploader


        onPrimary={bulkImportDevices}
        onSecondary={() => setImportShow(false)}
        onExtra={(id) => console.log("Extra Button Clicked:", id)} />

      <ToastContainer position="top-end" className="p-3">
        <AppToast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      </ToastContainer>

    </div>
  );
};

export default NewDeviceTab;
