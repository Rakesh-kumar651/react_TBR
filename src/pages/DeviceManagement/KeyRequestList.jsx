import React, { useState } from 'react'
import gatewayIcon from './../../assets/img/icons/gateway-icon.svg'
import filterPlusIcon from './../../assets/img/icons/filter-plus.svg'
import searchIcon from './../../assets/img/icons/search.svg'
import acendingIcon from './../../assets/img/icons/acending-sort.svg'
import listIcon from './../../assets/img/icons/list.svg'
import { Button, ToastContainer } from 'react-bootstrap'
import DataTable from '../../components/Table/DataTable'
import ImportDevicesModal from '../../components/Modal/ImportDevicesModal'
import ConfirmModal from '../../components/Modal/ConfirmModal'
import CustomPagination from '../../components/Pagination/CustomPagination'
import ReusableSelect from '../../components/Forms/Selectbox'
import { useDeviceRetrieveGroup } from "../../hooks/devicemanagement/useDeviceRetrieveGroup";
import { useSelector, useDispatch } from "react-redux";
import SearchExpand from "../../components/Forms/SearchExpand";
import { useMapDevices } from "../../hooks/opas/newDevice/useMapDevices";
import { AppToast } from "../../components/toast";
import { useBulkCreateDevices } from "../../hooks/opas/newDevice/useBulkCreateDevices";


const PAGE_SIZE = 10;

const KeyRequestList = () => {
    const [show, setShow] = useState(false);
    const [confirmShow, setconfirmShow] = useState(false);
    const [allIds, setallIds] = useState([])
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [sortField, setSortField] = useState("GroupName");
    const [sortOrder, setSortOrder] = useState("desc"); // default
    const { mutate: bulkCreate } = useBulkCreateDevices();
    const token = useSelector((state) => state.auth.accessToken);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success"
    });
    const handleSelectAll = () => {

        const newState = !selectAll;
        const ids = tableData.map(item => item.id);
        setallIds(ids);
        setSelectAll(newState);
        setSelectedRows(newState ? ids : []);
    };

    const handleRowSelect = (row) => {
        let updated;

        if (selectedRows.includes(row.id)) {
            updated = selectedRows.filter((rowId) => rowId !== row.id);
        } else {
            updated = [...selectedRows, row.id];
        }

        setSelectedRows(updated);


        setSelectAll(updated.length === data?.items.length);


    };



    const { data, isLoading, isError } = useDeviceRetrieveGroup({
        page,
        limit: PAGE_SIZE,
        sortBy: sortField,
        sortOrder: sortOrder,
        search,
        token
    });




    const tableData = data?.items || [];
    const totalPages = data?.totalPages || 0;

    const columns = [
        { label: "Group Name", key: "groupName" },
        { label: "Devices", key: "deviceCount" },
        { label: "Created Date", key: "createdAt" },
        { label: "Status", key: "status" }
        
        // { label: "Actions", key: "actions" }
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
        setPage(page); // reset page on search
    };

    const bulkImportDevices = (jsonData) => {
        console.log("JSON from file:", jsonData);

        bulkCreate(
            { payload: jsonData, token },
            {
                onSuccess: () => {
                    setShow(false)

                    //setErrorMessage(false);
                    setToast({
                        show: true,
                        message: "Devices import successfully",
                        type: "success"
                    });

                }, onError: (data) => {
                    setShow(false)

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

    const handleSortToggle = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        setPage(page); // reset pagination
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
                    <h2 className='card-title d-flex align-items-center gap-2'><img src={gatewayIcon} alt='gateway' className='card-title-img' />Key Request</h2>
                    <div className="filter-container flex-wrap">
                        <span className='d-inline-block'>
                            <Button size='sm' variant='dark' className='rounded-pill' onClick={() => setShow(true)}>Import devices</Button>
                        </span>
                        {/* <span className='d-inline-block'>
                            <ReusableSelect
                                mode="single"
                                placeholder="All status"
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
                                    { label: "Group Name", value: "GroupName" },
                                    // { label: "Firmware Name", value: "firmwareName" },
                                    // { label: "Board Name", value: "boardName" },
                                    // { label: "OS Name", value: "osName" },
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
                <div className='sub-card-body'>

                    <DataTable columns={columns} type='keyRequestList' data={tableData} sortfilter="check" selectAll={selectAll} selectedRows={selectedRows} handleSelectAll={handleSelectAll} handleRowSelect={handleRowSelect} />

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

                    // extraButtons={[
                    //     { id: "1", label: "Validate", variant: "info" },
                    // ]}

                    onPrimary={bulkImportDevices}
                    onSecondary={() => setShow(false)}
                    onExtra={(id) => console.log("Extra Button Clicked:", id)} />
                <ConfirmModal confirmShow={confirmShow} confirmonHide={() => setconfirmShow(false)} />
            </div>
        </>
    )
}

export default KeyRequestList