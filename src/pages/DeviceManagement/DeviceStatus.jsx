import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import gatewayIcon from './../../assets/img/icons/gateway-icon.svg'
import filterPlusIcon from './../../assets/img/icons/filter-plus.svg'
import searchIcon from './../../assets/img/icons/search.svg'
import acendingIcon from './../../assets/img/icons/acending-sort.svg'
import listIcon from './../../assets/img/icons/list.svg'
import { Button, ToastContainer } from 'react-bootstrap'
import DataTable from '../../components/Table/DataTable'
import DeviceKeyModal from '../../components/Modal/DeviceKeyModal'
import ReusableSelect from '../../components/Forms/Selectbox'
import CustomPagination from '../../components/Pagination/CustomPagination'
import { useDeviceRetrieveAll } from "../../hooks/devicemanagement/useDeviceRetrieveAll";
import { useUpdateDeviceLicense } from "../../hooks/opas/newDevice/useUpdateDeviceLicense";
import { useNavigate } from "react-router-dom";
import { AppToast } from "../../components/toast";
import SearchExpand from "../../components/Forms/SearchExpand";
import { useDeviceExportDevices } from "../../hooks/devicemanagement/useDeviceExportDevices";
import ConfirmModal from "../../components/Modal/ConfirmModal";

const PAGE_SIZE = 10;

const DeviceStatus = () => {
  const [show, setShow] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedLicenseRows, setSelectedLicenseRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState("CreatedAt");
  const [sortOrder, setSortOrder] = useState("desc"); // default
  const [page, setPage] = useState(1);
   const [confirmShow, setconfirmShow] = useState(false);
  const [search, setSearch] = useState("");
  const [allIds, setallIds] = useState([])
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });
  //  const { mutate, isLoadingInialize, isSuccess, isErrorInialize, error } =useDeviceRetrieveAll();
  const { mutate: updateLicense, updateIsLoading } = useUpdateDeviceLicense();
  const { mutate: exportDevices, exporIsLoading } = useDeviceExportDevices();
  const handleSelectAll = () => {

    const newState = !selectAll;
    const ids = tableData.map(item => item.id);
    const licenseids = tableData.map(item => ({
      deviceId: item.opasDeviceId,
      LicensePath: item.licensePath
    }));
    setallIds(ids);
    setSelectAll(newState);
    setSelectedRows(newState ? ids : []);
    setSelectedLicenseRows(newState ? licenseids : []);
  };

  const handleRowSelect = (row) => {
    let updated;
    let updatedLicenseRows;

    if (selectedRows.includes(row.id)) {
      updated = selectedRows.filter((rowId) => rowId !== row.id);
      updatedLicenseRows = selectedLicenseRows.filter((item) => item.deviceId !== row.opasDeviceId);
    } else {
      updated = [...selectedRows, row.id];
      updatedLicenseRows = [...selectedLicenseRows, { deviceId: row.opasDeviceId, LicensePath: row.licensePath }];
    }

    setSelectedRows(updated);
    setSelectedLicenseRows(updatedLicenseRows);

    setSelectAll(updated.length === data?.items.length);


  };



  const { data, isLoading, isError } = useDeviceRetrieveAll({
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
    // { label: "Hardware ID", key: "hardwareId" },
    { label: "Group Name", key: "groupName" },
    { label: "Cluster Name", key: "clusterName" },
    { label: "Firmware", key: "firmwareName" },
    { label: "Created Date", key: "createdAt" },
    { label: "Key status", key: "status" },
    { label: "Action", key: "actions" }
  ];
  // const handleEdit = (row) => {
  //     console.log("Edit clicked:", row);

  // };

  // const handleDelete = (row) => {
  //     console.log("Delete clicked:", row);
  // };
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

  const handleUpdateLicense = () => {

    if (selectedRows.length === 0) {
      setToast({
        show: true,
        message: "Please select at least one device",
        type: "warning",
      });
      return;
    }
   setconfirmShow(true);

    
  };

  const handleSendToOpasConfirm = () => {
    setconfirmShow(false);
    const payload = selectedLicenseRows;
    updateLicense(
      { payload, token },
      {
        onSuccess: (data) => {
          setToast({
            show: true,
            message: data.message,
            type: "success"
          });
        },
        onError: (error) => {
          setToast({
            show: true,
            message:
              error?.response?.data?.message ||
              "Failed to update license",
            type: "error"
          });
        }
      }
    );
  }



  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setPage(page); // reset pagination
  };

  const handleExport = () => {

    if (selectedRows.length === 0) {
      setToast({
        show: true,
        message: "Please select at least one device",
        type: "warning",
      });
      return;
    }

    exportDevices(
      { payload: selectedRows, token },
      {
        onSuccess: (blob) => {
          const url = window.URL.createObjectURL(blob);

          downloadFromUrl(url, "exported_devices.zip");
        },
        onError: (err) => {
          console.error("Export failed", err);
        }
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

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <AppToast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      </ToastContainer>

      <div className='mb-4'>

        <div className='sub-card-header d-flex justify-content-between flex-wrap gap-2'>
          <h2 className='card-title d-flex align-items-center gap-2'><img src={gatewayIcon} alt='gateway' className='card-title-img' />Device Status</h2>
          <div className="filter-container flex-wrap">
            <span className='d-inline-block'>
              <Button size='sm' variant='dark' className='rounded-pill' onClick={handleExport} >Export devices</Button>
            </span>
            <span className='d-inline-block'>
              <Button size='sm' variant='dark' className='rounded-pill' onClick={handleUpdateLicense} >Send to OPAS</Button>
            </span>
            {/* <span className='d-inline-block'>
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
                                mode="multiple"
                                placeholder="Select Group"
                                options={[
                                    { value: "all", label: "All" },
                                    { value: "completed", label: "Completed" },
                                ]}
                                onChange={(v) => console.log("Selected:", v)}
                            />
                        </span> */}
            {/* <span className='d-inline-block'>
                            <a className='actionbtn actionbtn-outline'>
                                <img src={searchIcon} alt='filter searchIcon' />
                            </a>
                        </span> */}
            <span className='d-inline-block'>
              <ReusableSelect
                mode="single"
                placeholder="Sort by"
                options={[
                  { label: "Name", value: "Name" },
                  { label: "Created Date", value: "CreatedAt" },
                  { label: "Status", value: "Status" },
                  { label: "Cluster Name", value: "ClusterName" },
                  { label: "Group Name", value: "GroupName" },
                ]}
                onChange={(v) => setSortField(v.value)}
              />
            </span>
            <SearchExpand onSearch={handleSearch} />
            <span className='d-inline-block'>
              <a className="actionbtn actionbtn-outline" onClick={handleSortToggle} role="button">
                <img src={acendingIcon} alt="sort" className={`sort-icon ${sortOrder}`} />
              </a>
            </span>

          </div>
        </div>
      </div>
      <div>
        <div className="sub-card-body">
          <DataTable columns={columns} data={tableData} type='deviceStatus' sortfilter="check" selectAll={selectAll} selectedRows={selectedRows} handleSelectAll={handleSelectAll} handleRowSelect={handleRowSelect} />
        </div>
        <CustomPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <ConfirmModal
          confirmShow={confirmShow}
          confirmonHide={() => setconfirmShow(false)}
          onConfirm={handleSendToOpasConfirm}
        />

        <DeviceKeyModal show={show} onHide={() => setShow(false)} />
      </div>
    </>
  )
}

export default DeviceStatus