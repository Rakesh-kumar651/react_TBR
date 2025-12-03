import React from 'react'
import gatewayIcon from './../../assets/img/icons/gateway-icon.svg'
import filterPlusIcon from './../../assets/img/icons/filter-plus.svg'
import searchIcon from './../../assets/img/icons/search.svg'
import acendingIcon from './../../assets/img/icons/acending-sort.svg'
import listIcon from './../../assets/img/icons/list.svg'
import { Badge } from 'react-bootstrap'
import DeviceCard from '../../components/DeviceManagement/DeviceCard'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SearchExpand from '../../components/Forms/SearchExpand'
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
                            <SearchExpand onSearch={(text) => console.log("Search:", text)} />
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
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'>
                        <DeviceCard badgeClass="create" badgeTitle="Create" />
                    </div>
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'>
                        <DeviceCard badgeClass="ready" badgeTitle="Ready" />
                    </div>
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'>
                        <DeviceCard badgeClass="live" badgeTitle="Live" />
                    </div>
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'>
                        <DeviceCard badgeClass="initiated" badgeTitle="Initiated" />
                    </div>
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'>
                        <DeviceCard badgeClass="down" badgeTitle="Down" />
                    </div>

                </div>
                <CustomPagination />
            </div>
        </>
    )
}

export default Devicemanagement