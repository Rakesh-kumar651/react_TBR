import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import ReusableSelect from '../Forms/Selectbox'
import searchIcon from './../../assets/img/icons/search.svg'
import acendingIcon from './../../assets/img/icons/acending-sort.svg'

import gatewayIcon from './../../assets/img/icons/gateway-icon.svg'
import DataTable from '../Table/DataTable'
import CustomPagination from '../Pagination/CustomPagination'
import ImportDevicesModal from '../Modal/ImportDevicesModal'
import SearchExpand from '../Forms/SearchExpand'
const LicenseRequestTable = () => {
  const [show, setShow] = useState(false);
  const tableData = [
    {
      id: 1,
      deviceName: "Device_685966552",
      groupName: "20251015.1",
      hardwareId: "xxxxxxxxxxxxxx",
      tag: "Linux Arm64",
      os: "Linux Arm64",
      firmware: "Tbx_Firmware 1",
      architecture: "x86_64",
      status: "Activated",
    },
    {
      id: 2,
      deviceName: "Device_578742622",
      groupName: "20251015.1",
      hardwareId: "xxxxxxxxxxxxxx",
      tag: "Linux Arm64",
      os: "Linux Arm64",
      firmware: "Tbx_Firmware 2",
      architecture: "x86_64",
      status: "Activated",
    },
    {
      id: 3,
      deviceName: "Device_578742622",
      groupName: "20251015.1",
      hardwareId: "xxxxxxxxxxxxxx",
      os: "Linux Arm64",
      firmware: "Tbx_Firmware 2",
      architecture: "x86_64",
      status: "Failed",

    }
  ];
  const columns = [
    { label: "", key: "checkbox" },   // checkbox column
    { label: "Device Name", key: "deviceName" },
    { label: "Group Name", key: "groupName" },
    { label: "Serial Number", key: "hardwareId" },
    { label: "OS", key: "os" },
    { label: "Firmware", key: "firmware" },
    { label: "Architecture", key: "architecture" },
    { label: "Status", key: "status" },

    { label: "Action", key: "actions" }
  ];



  return (
    <div>
      <div className='mb-4'>

        <div className='sub-card-header d-flex justify-content-between flex-wrap gap-2'>
          <h2 className='card-title d-flex align-items-center gap-2'><img src={gatewayIcon} alt='gateway' className='card-title-img' />Device list</h2>
          <div class="filter-container flex-wrap">
            <span className='d-inline-block'>
              <Button size='sm' variant='dark' className='rounded-pill' >Initialize</Button>
            </span>
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
      <div className='sub-card-body'>
        <DataTable
          columns={columns}
          data={tableData}
          sortfilter="check"
        />
        
        <ImportDevicesModal show={show}
          onHide={() => setShow(false)}

          title="Import License Device"

          primaryButtonLabel="Save"
          secondaryButtonLabel="Cancel"

          dropZone={true}  // enable file uploader


          onPrimary={() => console.log("Extract clicked")}
          onSecondary={() => setShow(false)}
          onExtra={(id) => console.log("Extra Button Clicked:", id)} />
      </div>
      <CustomPagination />
    </div>
  )
}

export default LicenseRequestTable