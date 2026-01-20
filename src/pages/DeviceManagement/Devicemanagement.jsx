import React, { useState, useEffect } from 'react'
import gatewayIcon from './../../assets/img/icons/gateway-icon.svg'
import filterPlusIcon from './../../assets/img/icons/filter-plus.svg'
import searchIcon from './../../assets/img/icons/search.svg'
import acendingIcon from './../../assets/img/icons/acending-sort.svg'
import listIcon from './../../assets/img/icons/list.svg'
import { Badge } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import DeviceCard from '../../components/DeviceManagement/DeviceCard'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SearchExpand from '../../components/Forms/SearchExpand'
import DeviceCreationModal from '../../components/Modal/DeviceCreationModal'
import { useSelector, useDispatch } from "react-redux";
import { useDeviceRetrieveAll } from "../../hooks/devicemanagement/useDeviceRetrieveAll";
import ReusableSelect from '../../components/Forms/Selectbox'

const Devicemanagement = () => {
    const PAGE_SIZE = 10;
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const token = useSelector((state) => state.auth.accessToken);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [sortField, setSortField] = useState("CreatedAt");
const [sortOrder, setSortOrder] = useState("desc"); // default
    const handleCreate = (value) => {
        console.log("User entered:", value);  // you get back the value here
    };

    const { data, isLoading, isError, error } = useDeviceRetrieveAll({
        page,
        limit: PAGE_SIZE,
        sortField: sortField,
    sortOrder: sortOrder,
        search,
        token
    });

    useEffect(() => {
        if (isError && error?.response?.status === 401) {
            localStorage.clear();
            navigate("/", { replace: true });
        }
    }, [isError, error, navigate]);


    const handleSearch = (text) => {
        setSearch(text);
        setPage(1); // reset page on search
    };

const handleSortToggle = () => {
  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  setPage(page); // reset pagination
};

    const tableData = data?.items || [];
    const totalPages = data?.totalPages || 0;

    return (
        <>
            <div className='mb-4 sub-card-header'>

                <div className='card-header d-flex justify-content-between'>
                    <h2 className='card-title d-flex align-items-center gap-2'><img src={gatewayIcon} alt='gateway' className='card-title-img' />Device Management</h2>
                    <div className="filter-container">
                        {/* <span className='d-inline-block'>
                            <a className='actionbtn actionbtn-outline' onClick={() => setShow(true)}>
                                <img src={filterPlusIcon} alt='filter add' />
                            </a>
                        </span> */}
                        <span className='d-inline-block'>
                  <ReusableSelect
                    mode="single"
                    placeholder="Sort by"
                   options={[
                      { label: "Name", value: "Name" },
  { label: "Created Date", value: "CreatedAt" },
  { label: "Status", value: "Status" },
  { label: "Cluster Name", value: "ClusterName" },
  { label: "Group Name", value: "GroupName" },
]}
                    onChange={(v) => setSortField(v.value)}
                  />
                </span>
                        <span className='d-inline-block'>
                            <SearchExpand onSearch={handleSearch} />
                        </span>
                        {/* <span className='d-inline-block'>
                            <a className='actionbtn actionbtn-outline'>
                                <img src={acendingIcon} alt='filter sort' />
                            </a>
                        </span> */}
                        <span className='d-inline-block'>
                            <a className="actionbtn actionbtn-outline" onClick={handleSortToggle} role="button">
              <img src={acendingIcon} alt="sort"  className={`sort-icon ${sortOrder}`}/>
            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div className='sub-card-body'>
                <div className='row g-4 align-items-stretch'>


                    <DeviceCard badgeClass="live" badgeTitle="live" deviceData={tableData} />


                    {/* <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'>
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
                    </div> */}

                </div>
            </div>
            <CustomPagination currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage} />
            <DeviceCreationModal
                show={show}
                onHide={() => setShow(false)}
                label="Device Creation"
                inputLabel="Device name"
                buttonText="Create"

                onSubmit={handleCreate}
            />
        </>
    )
}

export default Devicemanagement