import React from 'react'
import Tabs from '../../components/Tabs/Tabs'
import ConfiguratorComponent from '../../components/Utilites/ConfiguratorComponent';
import NewDeviceTab from '../../components/Utilites/NewDeviceTab';
const ConfiguratorList = () => {

const tabData = [
    {
      id: "device",
      label: "New Device",
      content: <NewDeviceTab />,
    },
    {
      id: "configurator",
      label: "Configurator",
      content: <ConfiguratorComponent />,
    }
  ];

  return (
    <div>
          <Tabs tabs={tabData} />
    </div>
  )
}

export default ConfiguratorList