import React, { useState } from 'react'
import gatewayIcon from './../../assets/img/icons/gateway-icon.svg'
import filterPlusIcon from './../../assets/img/icons/filter-plus.svg'
import searchIcon from './../../assets/img/icons/search.svg'
import acendingIcon from './../../assets/img/icons/acending-sort.svg'
import listIcon from './../../assets/img/icons/list.svg'
import { Button } from 'react-bootstrap'
import DataTable from '../../components/Table/DataTable'
import DeviceKeyModal from '../../components/Modal/DeviceKeyModal'
import ReusableSelect from '../../components/Forms/Selectbox'
const DeviceStatus = () => {
    const [show, setShow] = useState(false);

    const tableData = [
        {
            id: 1,
            deviceName: "Device_685966552",
            hardwareId: "HDW_685966552",
            tag: "e32c3cab-03a1-4094-96e3-08de057de677",
            groupId: "20251015_1",
            firmware: "Tbx_Firmware 1",
            status: "Generated"
        },
        {
            id: 2,
            deviceName: "Device_578742622",
            hardwareId: "HDW_578742622",
            tag: "e32c3cab-03a1-4094-96e3-08de057de677",
            groupId: "20251015_1",
            firmware: "Tbx_Firmware 2",
            status: "Generated"
        },
        {
            id: 3,
            deviceName: "Device_578742622",
            hardwareId: "HDW_578742622",
            tag: "e32c3cab-03a1-4094-96e3-08de057de677",
            groupId: "20251015_1",
            firmware: "Tbx_Firmware 2",
            status: "Generated"
        }
    ];
    const columns = [
        { label: "", key: "checkbox" },   // checkbox column
        { label: "Device Name", key: "deviceName" },
        { label: "Hardware ID", key: "hardwareId" },
        { label: "Tag", key: "tag" },
        { label: "Group ID", key: "groupId" },
        { label: "Firmware", key: "firmware" },
        { label: "Key status", key: "status" },
        { label: "Action", key: "actions" }
    ];
    const handleEdit = (row) => {
        console.log("Edit clicked:", row);

    };

    const handleDelete = (row) => {
        console.log("Delete clicked:", row);
    };

    return (
        <>
            <div className='mb-4'>

                <div className='card-header d-flex justify-content-between flex-wrap gap-2'>
                    <h2 className='card-title d-flex align-items-center gap-2'><img src={gatewayIcon} alt='gateway' className='card-title-img' />Device Status</h2>
                    <div class="filter-container flex-wrap">
                        <span className='d-inline-block'>
                            <Button size='sm' variant='dark' className='rounded-pill' onClick={() => setShow(true)} >Export devices</Button>
                        </span>
                        <span className='d-inline-block'>
                            <Button size='sm' variant='dark' className='rounded-pill' >Send to OPAS</Button>
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
            <div>
                <DataTable
                    columns={columns}
                    data={tableData}
                    sortfilter="check"          // OR "check"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
            <DeviceKeyModal show={show} onHide={() => setShow(false)} />
        </>
    )
}

export default DeviceStatus