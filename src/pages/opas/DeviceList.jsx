import React from 'react'
import Tabs from '../../components/Tabs/Tabs'
import NewDeviceTab from '../../components/opas/NewDeviceTab';
import LicenseRequestTable from '../../components/opas/LicenseRequestTable';
import ViewModal from '../../components/Modal/ViewModal';

const DeviceList = () => {
  const tabData = [
    {
      id: "device",
      label: "New Device",
      content: <NewDeviceTab  tapType='newdevice'/>,
    },
    {
      id: "license",
      label: "License Requested",
      content: <NewDeviceTab  tapType='licenserequest'/>,
      //content: <LicenseRequestTable  type='licenserequest'/>
    }
  ];

  return (
    <div>
      <Tabs tabs={tabData} />
      <ViewModal />
    </div>
  )
}

export default DeviceList