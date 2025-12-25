import React, { useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import gatewayIcon from './../../assets/img/icons/gateway-icon.svg'
import filterPlusIcon from './../../assets/img/icons/filter-plus.svg'
import searchIcon from './../../assets/img/icons/search.svg'
import acendingIcon from './../../assets/img/icons/acending-sort.svg'
import listIcon from './../../assets/img/icons/list.svg'
import { Button } from 'react-bootstrap'
import DataTable from '../../components/Table/DataTable'
import DeviceKeyModal from '../../components/Modal/DeviceKeyModal'
import ReusableSelect from '../../components/Forms/Selectbox'
import CustomPagination from '../../components/Pagination/CustomPagination'
import { useDeviceRetrieveAll } from "../../hooks/devicemanagement/useDeviceRetrieveAll";
import { useUpdateDeviceLicense } from "../../hooks/opas/newDevice/useUpdateDeviceLicense";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

const DeviceStatus = () => {
    const [show, setShow] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedLicenseRows, setSelectedLicenseRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
const navigate = useNavigate();
  const token = useSelector((state) => state.auth.accessToken);
 const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
   const [allIds,setallIds]=useState([])
   //  const { mutate, isLoadingInialize, isSuccess, isErrorInialize, error } =useDeviceRetrieveAll();
const { mutate: updateLicense, updateIsLoading } = useUpdateDeviceLicense();
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
            updatedLicenseRows = selectedLicenseRows.filter((item) => item.id !== row.id);
        } else {
            updated = [...selectedRows, row.id];
            updatedLicenseRows = [...selectedLicenseRows, { deviceId: row.opasDeviceId, LicensePath: row.licensePath } ];
        }

        setSelectedRows(updated);
       setSelectedLicenseRows(updatedLicenseRows);
        
        //setSelectAll(updated.length === data?.items.length);
        

    };



  const { data, isLoading, isError } = useDeviceRetrieveAll({
    page,
    limit: PAGE_SIZE,
    sortField: "CreatedAt",
    sortOrder: "desc",
    search,
    token
  });



  
  const tableData = data?.items || [];
  const totalPages = data?.totalPages || 0;


    const columns = [
        { label: "", key: "checkbox" },   // checkbox column
        { label: "Device Name", key: "name" },
        { label: "Hardware ID", key: "hardwareId" },
        { label: "Tag", key: "tag" },
        { label: "Group ID", key: "groupId" },
        { label: "Firmware", key: "firmwareName" },
        { label: "Key status", key: "status" },
        { label: "Action", key: "actions" }
    ];
    const handleEdit = (row) => {
        console.log("Edit clicked:", row);

    };

    const handleDelete = (row) => {
        console.log("Delete clicked:", row);
    };
const handleSearch = (text) => {
    setSearch(text);
    setPage(1); // reset page on search
  };

  //if (isLoading) return <p>Loading devices...</p>;
  if (isError) {  
   // dispatch(logout());
    // navigate
    navigate("/");
  }

  const handleUpdateLicense = () => {
  const payload = selectedLicenseRows;

  updateLicense({ payload, token });
};



    return (
        <>
            <div className='mb-4'>

                <div className='sub-card-header d-flex justify-content-between flex-wrap gap-2'>
                    <h2 className='card-title d-flex align-items-center gap-2'><img src={gatewayIcon} alt='gateway' className='card-title-img' />Device Status</h2>
                    <div className="filter-container flex-wrap">
                        <span className='d-inline-block'>
                            <Button size='sm' variant='dark' className='rounded-pill' onClick={() => setShow(true)} >Export devices</Button>
                        </span>
                        <span className='d-inline-block'>
                            <Button size='sm' variant='dark' className='rounded-pill' onClick={handleUpdateLicense} >Send to OPAS</Button>
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
                                mode="multiple"
                                placeholder="Select Group"
                                options={[
                                    { value: "all", label: "All" },
                                    { value: "completed", label: "Completed" },
                                ]}
                                onChange={(v) => console.log("Selected:", v)}
                            />
                        </span>
                        <span className='d-inline-block'>
                            <a className='actionbtn actionbtn-outline'>
                                <img src={searchIcon} alt='filter searchIcon' />
                            </a>
                        </span>
                        <span className='d-inline-block'>
                            <a className='actionbtn actionbtn-outline'>
                                <img src={acendingIcon} alt='filter sort' />
                            </a>
                        </span>

                    </div>
                </div>
            </div>
            <div className="sub-card-body">
                <DataTable columns={columns} data={tableData} sortfilter="check"  selectAll={selectAll} selectedRows={selectedRows} handleSelectAll={handleSelectAll} handleRowSelect={handleRowSelect}/>
            </div>
            <CustomPagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
            <DeviceKeyModal show={show}   onHide={() => setShow(false)} />
        </>
    )
}

export default DeviceStatus