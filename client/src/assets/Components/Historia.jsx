import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faFileExcel, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../View/Navbar";
import DataTable from "react-data-table-component";
import moment from "moment";

const Historia = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  const column = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Data:",
      selector: (row) => moment(row.createdAt).format("MMMM Do YYYY"),
      sortable: true,
    },   
    {
      name: "Produkte Ne Total",
      selector: (row) => {
        const totalQuantitySold = row.products.reduce(
          (acc, product) => acc + product.newQuanity,
          0
        );
        return totalQuantitySold;
      },
      sortable: true,
    },
    {
      name: "Vlera Totale",
      selector: (row) =>
        row.products.reduce((total, product) => total + product.totalPrice, 0),
      sortable: true,
    },
    {
      name: "Detajet",
      selector: (row) => (
        <div>
        
          <Link to={`/historia/xhdo-histori/${row._id}`}>
            <FontAwesomeIcon
              style={{ padding: "20px", height: "20px" }}
              icon={faBoxOpen}
            />
          </Link>
        </div>
      ),
    
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/orders");
        setAllProducts(response.data.products);
      } catch (error) {
        console.error("Your API has some problems", error);
      }
    };

    fetchData();
  }, []);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <Navbar></Navbar>

      <div className="container-fluid">
        <div className="content-wrapper">
         

          <div className="container-fluid mt-4">
            <DataTable
              className="table"
              columns={column}
              data={allProducts}
              selectableRows
              highlightOnHover
              striped
              pointerOnHover
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Historia;
