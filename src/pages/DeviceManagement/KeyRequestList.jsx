import React, { useState } from 'react'
import gatewayIcon from './../../assets/img/icons/gateway-icon.svg'
import filterPlusIcon from './../../assets/img/icons/filter-plus.svg'
import searchIcon from './../../assets/img/icons/search.svg'
import acendingIcon from './../../assets/img/icons/acending-sort.svg'
import listIcon from './../../assets/img/icons/list.svg'
import { Button } from 'react-bootstrap'
import DataTable from '../../components/Table/DataTable'
import ImportDevicesModal from '../../components/Modal/ImportDevicesModal'
import ConfirmModal from '../../components/Modal/ConfirmModal'
import CustomPagination from '../../components/Pagination/CustomPagination'
import ReusableSelect from '../../components/Forms/Selectbox'
import { useDeviceRetrieveAll } from "../../hooks/devicemanagement/useDeviceRetrieveAll";
import { useSelector,useDispatch } from "react-redux";
import SearchExpand from "../../components/Forms/SearchExpand";

const PAGE_SIZE = 10;

const KeyRequestList = () => {
    const [show, setShow] = useState(false);
    const [confirmShow, setconfirmShow] = useState(false);
 
 const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const token = useSelector((state) => state.auth.accessToken);
 const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

const handleSelectAll = () => {
         
        const newState = !selectAll;
        const ids = tableData.map(item => item.deviceId);
        setallIds(ids);
        setSelectAll(newState);
        setSelectedRows(newState ? ids : []);
    };

    const handleRowSelect = (id) => {
        let updated;

        if (selectedRows.includes(id)) {
            updated = selectedRows.filter((rowId) => rowId !== id);
        } else {
            updated = [...selectedRows, id];
        }

        setSelectedRows(updated);

        
        setSelectAll(updated.length === data?.items.length);


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
        { label: "Name", key: "name" },
        { label: "Device Name", key: "deviceName" },
        { label: "Status", key: "status" },
        { label: "Created Date", key: "createdAt" },
        { label: "Actions", key: "actions" }
    ];
    const handleEdit = (row) => {
        console.log("Edit clicked:", row);
        setconfirmShow(true)
    };

    const handleDelete = (row) => {
        console.log("Delete clicked:", row);
    };

    const handleSearch = (text) => {
    setSearch(text);
    setPage(1); // reset page on search
  };

    return (
        <>
            <div className='mb-4'>

                <div className='sub-card-header d-flex justify-content-between flex-wrap gap-2'>
                    <h2 className='card-title d-flex align-items-center gap-2'><img src={gatewayIcon} alt='gateway' className='card-title-img' />Key Request</h2>
                    <div class="filter-container flex-wrap">
                        <span className='d-inline-block'>
                            <Button size='sm' variant='dark' className='rounded-pill' onClick={() => setShow(true)}>Import devices</Button>
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
                        {/* <span className='d-inline-block'>
                            <a className='actionbtn actionbtn-outline'>
                                <img src={searchIcon} alt='filter searchIcon' />
                            </a>
                        </span> */}
                        <SearchExpand onSearch={handleSearch} />
                        <span className='d-inline-block'>
                            <a className='actionbtn actionbtn-outline'>
                                <img src={acendingIcon} alt='filter sort' />
                            </a>
                        </span>

                    </div>
                </div>
            </div>
            <div>
                <div className='sub-card-body'>

                    <DataTable columns={columns} data={tableData} sortfilter="check"  selectAll={selectAll} selectedRows={selectedRows} handleSelectAll={handleSelectAll} handleRowSelect={handleRowSelect}/>

                </div>
                    <CustomPagination
                           currentPage={page}
                           totalPages={totalPages}
                           onPageChange={setPage}
                         />
                <ImportDevicesModal show={show}
                    onHide={() => setShow(false)}
                   size="lg" 
                    title="Import Devices"

                    primaryButtonLabel="Extract"
                    secondaryButtonLabel="Cancel"

                    dropZone={true}  // enable file uploader

                    extraButtons={[
                        { id: "1", label: "Validate", variant: "info" },
                    ]}

                    onPrimary={() => console.log("Extract clicked")}
                    onSecondary={() => setShow(false)}
                    onExtra={(id) => console.log("Extra Button Clicked:", id)} />
                <ConfirmModal confirmShow={confirmShow}  confirmonHide={() => setconfirmShow(false)} />
            </div>
        </>
    )
}

export default KeyRequestList