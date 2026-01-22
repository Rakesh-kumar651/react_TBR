import React from 'react'
import routerIcon from './../../assets/img/icons/routerIcon.svg'


const STATUS_MAP = {
  0: { label: "Created", className: "created-badge" },
  1: { label: "Ready", className: "ready-badge" },
  2: { label: "Initiated", className: "initiated-badge" },
  3: { label: "Live", className: "live-badge" },
  4: { label: "Down", className: "down-badge" },
};


const DeviceCard = ({ deviceData, badgeClass, badgeTitle }) => {
  if (deviceData.length==0) {
    return (
      <div className="col-12">
        <div className="text-center py-5 text-muted">
          <h6>No devices found</h6>
          {/* <p className="mb-0 fs-7">
            Try adjusting your search or filters
          </p> */}
        </div>
      </div>
    );
  }

  return (
    <>
      {deviceData?.map((data) => (
        <div key={data.id || data.deviceId} className='col-xl-3 col-lg-4 col-md-6 col-sm-12'>
          <div

            className='card asset_landing_card w-100 position-relative'
          >
            <div className="top_asset_container">
              <div className="asset_icon_container d-flex align-items-center justify-content-center">
                <img src={routerIcon} alt="device" />
              </div>

              <div className="asset_content_container ms-2">
                <div className="asset_head_container mb-1">
                  <p className="asset_head">{data.name}</p>
                </div>

                <div className="asset_description_container">
                  <p className="asset_content">
                    {data.serialNumber || 'NA'}
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-2 d-flex align-items-start gap-3'>
              <div className='ps-1'>
                <div className='fs-7'>Board</div>
                <p className='mb-0 fs-7 font-semibold'>
                  {data.board || 'Linux arm64'}
                </p>
              </div>

              <div className='vr'></div>

              <div className='ps-1'>
                <div className='fs-7'>Status</div>
                <span className={`badge ${STATUS_MAP[data.status]?.className || "default-badge"}`}>
                  {STATUS_MAP[data.status]?.label || "Unknown"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default DeviceCard
