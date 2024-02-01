import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faFileExport } from "@fortawesome/free-solid-svg-icons";
import readXlsxFile from 'read-excel-file';

const Importexel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const input = document.getElementById('input');
    const handleFileChange = () => {
      setFile(input.files[0]);
    };

    input.addEventListener('change', handleFileChange);

    return () => {
      input.removeEventListener('change', handleFileChange);
    };
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setErrorMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', file);

    try {
      const response = await axios.patch('http://localhost:8000/api/products/import', formData);

      console.log(response.data);

      navigate('/api/products');
    } catch (error) {
      setErrorMessage("Error submitting data");
      console.error("Error submitting data", error);
    }
  };

  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 mt-4">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-header-title">
                          Import Excel File Here:
                        </h4>
                      </div>
                      <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                          <label htmlFor="importFile" className="custom-file-input">
                            <div className="drag-drop-text">
                              <FontAwesomeIcon
                                className="upload-icon"
                                icon={faCloudUploadAlt}
                              />
                              <div>Drag and Drop</div>
                            </div>
                            <input type="file" id="input" name="excelFile" />

                          </label>
                          <button
                            type="submit"
                            name="save_excel_data"
                            className="btn btn-success mt-3"
                          >
                            Import
                            <FontAwesomeIcon icon={faFileExport} />
                          </button>
                        </form>
                      </div>
                      <Link to="/inventar" className="help-button">
                        Go Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Importexel;
