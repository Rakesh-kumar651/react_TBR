import React from 'react'
import gatewayIcon from './../../assets/img/icons/gateway-icon.svg'
import filterPlusIcon from './../../assets/img/icons/filter-plus.svg'
import searchIcon from './../../assets/img/icons/search.svg'
import acendingIcon from './../../assets/img/icons/acending-sort.svg'
import listIcon from './../../assets/img/icons/list.svg'
import routerIcon from './../../assets/img/icons/routerIcon.svg'
import { Badge } from 'react-bootstrap'
const Devicemanagement = () => {
    return (
        <>
            <div className='mb-4'>

                <div className='card-header d-flex justify-content-between'>
                    <h2 className='card-title d-flex align-items-center gap-2'><img src={gatewayIcon} alt='gateway' className='card-title-img' />Device Management</h2>
                    <div class="filter-container">
                        <span className='d-inline-block'>
                            <a className='actionbtn actionbtn-outline'>
                                <img src={filterPlusIcon} alt='filter add' />
                            </a>
                        </span>
                        <span className='d-inline-block'>
                            <a className='actionbtn actionbtn-outline'>
                                <img src={searchIcon} alt='filter Search' />
                            </a>
                        </span>
                        <span className='d-inline-block'>
                            <a className='actionbtn actionbtn-outline'>
                                <img src={acendingIcon} alt='filter sort' />
                            </a>
                        </span>
                        <span className='d-inline-block'>
                            <a className='actionbtn actionbtn-outline'>
                                <img src={listIcon} alt='filter list' />
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <div className='row g-4 align-items-stretch'>
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3'>
                        <div className='card asset_landing_card w-100 position-relative'>
                            <div class="top_asset_container">
                                <div class="asset_icon_container d-flex align-items-center  justify-content-center">
                                    <img src={routerIcon} />
                                </div>
                                <div class="asset_content_container ms-2">
                                    <div class="asset_head_container mb-1 ">
                                        <p class="asset_head">nxp </p>
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
                                    <Badge bg="primary">Primary</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3'>
                        <div className='card asset_landing_card w-100 position-relative'>

                        </div>
                    </div>
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3'>
                        <div className='card asset_landing_card w-100 position-relative'>

                        </div>
                    </div>
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3'>
                        <div className='card asset_landing_card w-100 position-relative'>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Devicemanagement