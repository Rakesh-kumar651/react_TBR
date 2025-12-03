import React from 'react'
import Tabs from '../../components/Tabs/Tabs'
import NewDeviceTab from '../../components/Utilites/NewDeviceTab';
import LicenseRequestTable from '../../components/Utilites/LicenseRequestTable';

const DeviceList = () => {
  const tabData = [
    {
      id: "device",
      label: "New Device",
      content: <NewDeviceTab />,
    },
    {
      id: "license",
      label: "License Requested",
      content: <LicenseRequestTable />,
    }
  ];

  return (
    <div>
      <Tabs tabs={tabData} />
    </div>
  )
}

export default DeviceList