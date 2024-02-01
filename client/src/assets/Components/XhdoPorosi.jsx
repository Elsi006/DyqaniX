import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArchive,
  faFileExcel,
  faHeart,
  faHome,
  faFileExport,
  faList,
  faPen,
  faTable,
  faTrash,
  faUser,
  faUserPlus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import DataTable from "react-data-table-component";
import Navbar from "../View/Navbar";

const XhdoPorosi = (porps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };
 

  const column = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Emertimi I Produktit",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Specifikat e Produktit",
      selector: (row) => row.product,
      sortable: true,
    },
    {
      name: "Kodi I Produktit",
      selector: (row) => row.barcode,
      sortable: true,
    },
    {
      name: "Sasia",
      selector: (row) => row.newQuanity,
      sortable: true,
    },
    {
      name: "Cmimi i Shitjes",
      selector: (row) => row.priceofsell,
      sortable: true,
    },
  
  ];

  const newStyle = {
    headRow: {
      style: {
        backgroundColor: "#1e3050",
        color: "#ffffff",
        fontSize: "16px ",
        border: "none",
        borderRadius: "20px",
      },
    },
    headCells: {
      style: {
        padding: "15px",
        textAlign: "center",
        verticalAlign: "middle",
        borderBottom: "1px solid #dee2e6",
        fontSize: "18px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "150px",
      },
    },
  };

  useEffect(() => {
   axios.get(`http://localhost:8000/api/order/${id}`)
  .then((res) => {
    console.log("resdata", res.data);
    console.log("resdataorderproducts", res.data.order.products);
    setAllProducts(res.data.order.products);
  
    
  })
  .catch((err) => {
    console.error("Error fetching product:", err);
  });
}, [id]);

console.log("allProducts", allProducts);
console.log("totalprice", allProducts.totalPrice);

const totalPrice = allProducts.reduce((total, product) => total + product.totalPrice, 0);

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
              customStyles={newStyle}
              pagination
              selectableRows
              highlightOnHover
              striped
              pointerOnHover
            ></DataTable>
            <p>Vlera Totale e Fatures {totalPrice}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default XhdoPorosi;
