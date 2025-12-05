import React from 'react'

const ConfiguratorComponent = () => {
    return (
        <div>
            <div className='sub-card-body'>
                <div className='d-flex align-items-center justify-content-center h-100'>
                    <div className='w-50 text-center'>
                        <h4 className='mb-2'>Download the keys</h4>

                        <div className="input-group rounded-5 bg-white py-1 align-items-center mb-1">
                            <input type="text" className="form-control border-0 bg-transparent" placeholder="https://dev.tinkerblox.io/deviceManagement/caeb4968-287c-49e7-96c2-..." value={"https://dev.tinkerblox.io/deviceManagement/caeb4968-287c-49e7-96c2-..."} />
                            <span className="pe-2"><button class="btn btn-dark btn-sm rounded-pill">Download</button></span>
                        </div>

                    </div>


                </div>
                <div>

                </div>
            </div>

        </div>
    )
}

export default ConfiguratorComponent