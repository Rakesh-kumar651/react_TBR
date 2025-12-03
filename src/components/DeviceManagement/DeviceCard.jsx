import React from 'react'

import routerIcon from './../../assets/img/icons/routerIcon.svg'
const DeviceCard = ({ badgeClass, badgeTitle }) => {
    return (
        <>
            <div className='card asset_landing_card w-100 position-relative'>
                <div class="top_asset_container">
                    <div class="asset_icon_container d-flex align-items-center  justify-content-center">
                        <img src={routerIcon} />
                    </div>
                    <div class="asset_content_container ms-2">
                        <div class="asset_head_container mb-1 ">
                            <p class="asset_head">Device 1</p>
                        </div>
                        <div class="asset_description_container ">
                            <p class="asset_content">SN - 5655  |  EX - 9865 </p>
                        </div>
                    </div>
                </div>
                <div className='mt-2 d-flex align-items-start gap-3'>
                    <div className='ps-1'>
                        <div className='fs-7'>Board</div>
                        <p className='mb-0 fs-7 font-semibold'>Linux arm64</p>
                    </div>
                    <div className='vr'></div>
                    <div className='ps-1'>
                        <div className='fs-7'>Status</div>
                        <span className={`badge ${badgeClass}-badge`}>{badgeTitle}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeviceCard