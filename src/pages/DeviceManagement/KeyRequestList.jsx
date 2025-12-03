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
const KeyRequestList = () => {
    const [show, setShow] = useState(false);
    const [confirmShow, setconfirmShow] = useState(false);
    const tableData = [
        {
            id: 1,
            name: "20251015_1",
            deviceName: "50",
            status: "initiated",
            createdDate: "02/04/2025 11:42",
        },
        {
            id: 2,
            name: "20251015_1",
            deviceName: "10",
            status: "create",
            createdDate: "02/04/2025 11:42",
        },
        {
            id: 2,
            name: "20251015_1",
            deviceName: "10",
            status: "ready",
            createdDate: "02/04/2025 11:42",
        },
    ];

    const columns = [
        { label: "Name", key: "name" },
        { label: "Device Name", key: "deviceName" },
        { label: "Status", key: "status" },
        { label: "Created Date", key: "createdDate" },
        { label: "Actions", key: "actions" }
    ];
    const handleEdit = (row) => {
        console.log("Edit clicked:", row);
        setconfirmShow(true)
    };

    const handleDelete = (row) => {
        console.log("Delete clicked:", row);
    };

    return (
        <>
            <div className='mb-4'>

                <div className='card-header d-flex justify-content-between flex-wrap gap-2'>
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
            <div>
                <div>

                    <DataTable
                        columns={columns}
                        data={tableData}
                        sortfilter="sn"          // OR "check"
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    <CustomPagination />
                </div>
                <ImportDevicesModal show={show}
                    onHide={() => setShow(false)}

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
                <ConfirmModal confirmShow={confirmShow} confirmonHide={() => setconfirmShow(false)} />
            </div>
        </>
    )
}

export default KeyRequestList