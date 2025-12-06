import React, { useState } from 'react'
import gatewayIcon from './../../assets/img/icons/gateway-icon.svg'
import filterPlusIcon from './../../assets/img/icons/filter-plus.svg'
import searchIcon from './../../assets/img/icons/search.svg'
import acendingIcon from './../../assets/img/icons/acending-sort.svg'
import { Button } from 'react-bootstrap'
import DataTable from '../Table/DataTable'
import CustomPagination from '../Pagination/CustomPagination'
import ClusterModal from '../Modal/ClusterModal'
import ReusableSelect from '../Forms/Selectbox'
import GetLicenseModal from '../Modal/GetLicenseModal'
import SearchExpand from '../Forms/SearchExpand'

const NewDeviceTab = () => {
    const [show, setShow] = useState(false);
    const [showLicense, setShowLicense] = useState(false);
    const [showGroup, setShowGroup] = useState(false);
    const handleCreate = (value) => {
        console.log("User entered:", value);  // you get back the value here
    };
    const tableData = [
        {
            id: 1,
            deviceName: "Device_685966552",
            hardwareId: "xxxxxxxxxxxxxx",
            os: "Linux Arm64",
            firmware: "Tbx_Firmware 1",
            architecture: "x86_64"
        },
        {
            id: 2,
            deviceName: "Device_578742622",
            hardwareId: "xxxxxxxxxxxxxx",
            os: "Linux Arm64",
            tag: "Linux Arm64",
            firmware: "Tbx_Firmware 2",
            architecture: "x86_64"
        },
        {
            id: 3,
            deviceName: "Device_578742622",
            hardwareId: "xxxxxxxxxxxxxx",
            os: "Linux Arm64",
            firmware: "Tbx_Firmware 2",
            architecture: "x86_64"
        }
    ];
    const columns = [
        { label: "", key: "checkbox" },   // checkbox column
        { label: "Device Name", key: "deviceName" },
        { label: "Serial Number", key: "hardwareId" },
        { label: "OS", key: "os" },
        { label: "Firmware", key: "firmware" },
        { label: "Architecture", key: "architecture" },
        { label: "Action", key: "actions" }
    ];
    return (
        <div>


            <div className='mb-4'>

                <div className='sub-card-header d-flex justify-content-between flex-wrap gap-2'>
                    <h2 className='card-title d-flex align-items-center gap-2'><img src={gatewayIcon} alt='gateway' className='card-title-img' />Device list</h2>
                    <div className="filter-container flex-wrap">
                        <span className='d-inline-block'>
                            <Button size='sm' variant='dark' className='rounded-pill' onClick={() => setShowLicense(true)} >Get license</Button>
                        </span>
                        <span className='d-inline-block'>
                            <Button size='sm' variant='dark' className='rounded-pill' onClick={() => setShowGroup(true)}>Create group</Button>
                        </span>
                        <span className='d-inline-block'>
                            <Button size='sm' variant='dark' className='rounded-pill' onClick={() => setShow(true)} >Create cluster</Button>
                        </span>
                        <span className='d-inline-block'>
                            <ReusableSelect
                                mode="multiple"
                                placeholder="Select Microservice"
                                options={[
                                    { value: "hpc", label: "HPC" },
                                    { value: "rule", label: "Rule Data" },
                                ]}
                                onChange={(v) => console.log("Selected:", v)}
                            />
                        </span>
                        <span className='d-inline-block'>
                            <SearchExpand onSearch={(text) => console.log("Search:", text)} />

                        </span>
                        <span className='d-inline-block'>
                            <a className='actionbtn actionbtn-outline'>
                                <img src={acendingIcon} alt='filter sort' />
                            </a>
                        </span>

                    </div>
                </div>
            </div>
            <div className='sub-card-body' >
                <DataTable
                    columns={columns}
                    data={tableData}
                    sortfilter="check"
                />
                <ClusterModal
                    show={show}
                    onHide={() => setShow(false)}
                    label="Cluster Name"
                    inputLabel="Cluster name"
                    buttonText="Create"
                    onSubmit={handleCreate}   // 👈 returns value here
                />
                <ClusterModal
                    show={showGroup}
                    onHide={() => setShowGroup(false)}
                    label="Create Group"
                    inputLabel="Group name"
                    buttonText="Create"
                    onSubmit={handleCreate}   // 👈 returns value here
                />
                <GetLicenseModal
                    show={showLicense}
                    onHide={() => setShowLicense(false)}
                    label="Create Group"
                    inputLabel="Group name"
                    buttonText="Create"
                    onSubmit={handleCreate}
                />
            </div>
                <CustomPagination />
        </div>
    )
}

export default NewDeviceTab