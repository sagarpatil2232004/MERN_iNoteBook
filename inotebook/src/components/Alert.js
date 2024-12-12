import React, { useContext, useState } from 'react';

export default function Alert() {

    const [showAlert, setShowAlert] = useState(false);

    const handleClose = () => {
        setShowAlert(false);
    };

    
  

    return (
        showAlert && (
            <div className="alert alert-warning alert-dismissible fade show d-flex justify-content-between" role="alert">
                <strong>Holy guacamole!</strong> 
                <button 
                    type="button" 
                    className="close" 
                    aria-label="Close" 
                    onClick={handleClose}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    );
}
