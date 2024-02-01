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
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import DataTable from "react-data-table-component";
import Navbar from "../View/Navbar";

const Inventari = (porps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filterProducts, setFilerProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };
  const deleteProduct = async (productId, productTitle, productQuantity) => {

    const userConfirmed = window.confirm(
      `Are you sure you want to delete the product "${productTitle}" with quantity ${productQuantity}?`
    );

    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/product/${productId}`);
        console.log("Product deleted successfully!");
      
        setAllProducts(
          allProducts.filter((product) => product._id !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
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
      name: "Specifikat E Produktit",
      selector: (row) => row.product,
      sortable: true,
    },
    {
      name: "Kodi I Produktit",
      selector: (row) => row.barcode,
      sortable: true,
    },
    {
      name: "Sasia ne Dyqan",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Cmimi i Blerjes",
      selector: (row) => row.priceofpurchase,
      sortable: true,
    },
    {
      name: "Cmimi i Shitjes",
      selector: (row) => row.priceofsell,
      sortable: true,
    },
    {
      name: "Veprime",
      selector: (row) => (
        <div>
          <Link to={`/inventar/edit_product/${row._id}`}>
            <FontAwesomeIcon
              style={{ padding: "20px", height: "20px" }}
              icon={faPen}
            />
          </Link>
          <FontAwesomeIcon
            onClick={() => deleteProduct(row._id, row.title, row.quantity)}
            style={{ padding: "20px", height: "20px" }}
            icon={faTrash}
          />
        </div>
      ),
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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        {
          setAllProducts(response.data.products);
          setFilerProducts(response.data.products);
        }
      } catch (error) {
        setErrorMessage("Your API has some problems");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const tableFilter = (e) => {
    const newFilter = filterProducts.filter((row) =>
    row.product.toLowerCase().includes(e.target.value.toLowerCase()) ||
    row.title.toLowerCase().includes(e.target.value.toLowerCase())
   
    );
    setAllProducts(newFilter);
  };

  return (
    <>
     <Navbar></Navbar>
      <div className="container-fluid">
        <div className="content-wrapper">
          <div className="custom-btn-container">
            <Link to={"/inventar/shto_produkt"} className="btn btn-primary">
              Shto  <FontAwesomeIcon icon={faCartPlus} />
            </Link>
            <Link to={"/inventar/importo_exel"} className="btn btn-primary">
              Shto me exel <FontAwesomeIcon icon={faFileExcel} />
            </Link>
          </div>

          <div className="container-fluid mt-4">
            <div style={{ display: "flex", justifyContent: "right" }}>
              <input
                onChange={tableFilter}
                style={{ borderRadius: "20px", padding: "6px 10px" }}
                type="text"
                placeholder="Kerko.."
              ></input>
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Inventari;
