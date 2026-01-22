import React, { useMemo, useState } from "react";
import { Button, Col, Modal, Row, Spinner, Alert,ToastContainer } from "react-bootstrap";
import ReusableSelect from "../Forms/Selectbox";
import { useGroupAll } from "../../hooks/opas/newDevice/useGroupAll";
import { useClusterAll } from "../../hooks/opas/newDevice/useClusterAll";
import { useSelector } from "react-redux";
import InputField from '../Forms/InputField';
import { useBulkCreateDevices } from "../../hooks/opas/newDevice/useBulkCreateDevices";
import { useMapDevices } from "../../hooks/opas/newDevice/useMapDevices";
import { useExportDevices } from "../../hooks/opas/newDevice/useExportDevices";
import { AppToast } from "../../components/toast";


const PAGE_SIZE = 1000;

const GetLicenseModal = ({ show, onHide, onSubmit, buttonText,selectedRows,totalDevices,onSuccess }) => {
  const token = useSelector((state) => state.auth.accessToken);

  const [selectedClusters, setSelectedClusters] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [firmwareName, setfirmwareName] = useState("");
  const { mutate: bulkCreate } = useBulkCreateDevices();
const { mutate: mapDevices } = useMapDevices();
const [firmwareVersion, setfirmwareVersion] = useState("");
const [os, setos] = useState("");
const [architecture, setarchitecture] = useState("");
const { mutate: exportDevices, isLoading } = useExportDevices();
const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });
  /* ------------------ CLUSTER API ------------------ */
  const {
    data: clusterdata,
    isLoading: clusterLoading,
    isError: clusterError,
  } = useClusterAll({
    page: 1,
    limit: PAGE_SIZE,
    sortField: "CreatedAt",
    sortOrder: "desc",
    search: "",
    token,
  });

  /* ------------------ GROUP API ------------------ */
  const {
    data: groupdata,
    isLoading: groupLoading,
    isError: groupError,
  } = useGroupAll({
    page: 1,
    limit: PAGE_SIZE,
    sortField: "CreatedAt",
    sortOrder: "desc",
    search: "",
    token,
  });

  /* ------------------ OPTIONS ------------------ */
  const clusterOptions = useMemo(
    () =>
      clusterdata?.items?.map((c) => ({
        value: c.clusterId,
        label: c.clusterName,
      })) || [],
    [clusterdata]
  );

  const groupOptions = useMemo(
    () =>
      groupdata?.items?.map((g) => ({
        value: g.groupId,
        label: g.groupName,
      })) || [],
    [groupdata]
  );

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = () => {
   
  const payload = {
      clusterId: selectedClusters.value || "",
      clusterName: selectedClusters.label || "",
      groupId: selectedGroups.value || "",
      groupName: selectedGroups.label || "",
      deviceIds: selectedRows || [],
      firmwareName: firmwareName || "",
      firmwareVersion: firmwareVersion || "",
      os: os || "",
      architecture: architecture || ""
    };

    mapDevices({ payload, token },
        {
         onSuccess: (data) => {
   onSuccess?.();
     bulkCreate(
    { payload: data, token },
    {
        onSuccess: () => {
             onHide();
        
        //setErrorMessage(false);
        setToast({
          show: true,
          message: "License requested successfully",
          type: "success"
        });
          
    },onError: (data) => {
         onHide();
        
        //setErrorMessage(false);
        setToast({
          show: true,
          message: data.response.data[0].errors[0] || "An error occurred",
          type: "error"
        });
      }
  
  }
    )
     },
    onError: (data) => {
         onHide();
        
        //setErrorMessage(false);
        setToast({
          show: true,
          message: data.response.data[0] || "An error occurred",
          type: "error"
        });
      }
  
    
    })
  };

 const handleExport = () => {
  const payload = {
      clusterId: selectedClusters.value || "",
      clusterName: selectedClusters.label || "",
      groupId: selectedGroups.value || "",
      groupName: selectedGroups.label || "",
      deviceIds: selectedRows || [],
      firmwareName: firmwareName || "",
      firmwareVersion: firmwareVersion || "",
      os: os || "",
      architecture: architecture || ""
    };

    mapDevices({ payload, token },
        {
         onSuccess: (data) => {

          onSuccess?.();

  exportDevices(
    { payload, token },
    {
      onSuccess: (blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "devices_export.json"; // or .csv / .xlsx
        link.click();
        onHide();
      },
      onError: (data) => {
         onHide();
        
        //setErrorMessage(false);
        setToast({
          show: true,
          message: data.response.data.message || "An error occurred",
          type: "error"
        });
      }
    }
  );
},
onError: (data) => {
         onHide();
        
        //setErrorMessage(false);
        setToast({
          show: true,
          message: data.response.data.message || "An error occurred",
          type: "error"
        });
      }
        });
};

  return (
      <><ToastContainer position="top-end" className="p-3">
        <AppToast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      </ToastContainer>
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      className="import-modal tp-adjusto"
    >
      <Modal.Header closeButton>
        <Modal.Title>Get License</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="p-3 rounded-5 bg-secondary-subtle">
          <button className="btn btn-sm btn-dark rounded-pill mb-3">
            Device count: {selectedRows.length || 0} 
          </button>

          {(clusterLoading || groupLoading) && (
            <div className="text-center my-3">
              <Spinner animation="border" />
            </div>
          )}

          {(clusterError || groupError) && (
            <Alert variant="danger">
              Failed to load cluster or group data
            </Alert>
          )}

          {!clusterLoading && !groupLoading && (
            <Row className="g-2">
              <Col lg={6}>
                <ReusableSelect
                 // mode="multiple"
                  placeholder="Select cluster"
                  options={clusterOptions}
                  value={selectedClusters}
                  onChange={setSelectedClusters}
                />
              </Col>

              <Col lg={6}>
                <ReusableSelect
                  //mode="multiple"
                  placeholder="Select group"
                  options={groupOptions}
                  value={selectedGroups}
                  onChange={setSelectedGroups}
                />
              </Col>
<Col lg={6}>
                 <InputField
  label="Firmware Name"
  type="text"
  name= "firmwareName"
  value={firmwareName}
  onChange={(val) => {
    setfirmwareName(val);

    // ✅ live validation
    // if (!val.trim()) {
    //   setErrorMessage(true);
    // } else {
    //   setErrorMessage(false);
    // }
  }}
  className= ""
  color=  ""
/>
</Col>
<Col lg={6}>
<InputField
  label="Firmware Version"
  type="text"
  name= "firmwareVersion"
  value={firmwareVersion}
  onChange={(val) => {
    setfirmwareVersion(val);

    // ✅ live validation
    // if (!val.trim()) {
    //   setErrorMessage(true);
    // } else {
    //   setErrorMessage(false);
    // }
  }}
  className= ""
  color=  ""
/>
</Col>
<Col lg={6}>
<InputField
  label="OS"
  type="text"
  name= "os"
  value={os}
  onChange={(val) => {
    setos(val);

    // ✅ live validation
    // if (!val.trim()) {
    //   setErrorMessage(true);
    // } else {
    //   setErrorMessage(false);
    // }
  }}
  className= ""
  color=  ""
/>

                </Col>
                <Col lg={6}>
                <InputField
  label="Architecture"
  type="text"
  name= "architecture"
  value={architecture}
  onChange={(val) => {
    setarchitecture(val);

    // ✅ live validation
    // if (!val.trim()) {
    //   setErrorMessage(true);
    // } else {
    //   setErrorMessage(false);
    // }
  }}
  className= ""
  color=  ""
/>
                </Col>
            </Row>
            
            
          )}
        </div>
      </Modal.Body>

      <Modal.Footer className="pt-0 border-0">
         
        <Button size='sm' variant='dark' className='rounded-pill' onClick={handleExport}>Export</Button>
                    
        <Button
          size="sm"
          variant="dark"
          className="rounded-pill"
          onClick={handleSubmit}
         // disabled={!selectedClusters.length && !selectedGroups.length}
        >
          {buttonText || "Create"}
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default GetLicenseModal;
