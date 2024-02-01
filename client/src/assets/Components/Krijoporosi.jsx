import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faHome,
  faArchive,
  faList,
  faBarcode,
  faAdd,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import Navbar from "../View/Navbar";

const Krijoporosi = (props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(
    JSON.parse(localStorage.getItem("selectedProducts")) || []
  );
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [totalOrderAmount, setTotalOrderAmount] = useState(0);

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
      name: "Veprime",
      selector: (row) => (
        <div>
          <FontAwesomeIcon
            onClick={() => plus(row._id)}
            style={{ cursor: "pointer", padding: "10px", height: "20px" }}
            icon={faAdd}
          />
          <FontAwesomeIcon
            onClick={() => minus(row._id)}
            style={{ cursor: "pointer", padding: "10px", height: "20px" }}
            icon={faMinus}
          />
        </div>
      ),
    },
    {
      name: "Cmimi",
      selector: (row) => {
        if (row.newQuanity === 1) {
          return row.priceofsell;
        } else if (row.newQuanity === 2) {
          return row.priceofsell * 2;
        } else {
          return row.totalPrice;
        }
      },
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setAllProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    calculateTotal();
  }, [selectedProducts, searchTerm, filteredProducts, suggestedProducts]);

  const tableFilter = (e) => {
    const newSearchTerm = e.target.value.toLowerCase();
    console.log("New Search Term:", newSearchTerm);

    setSearchTerm(newSearchTerm);

    const newFilter = allProducts.filter(
      (row) =>
        row.title.toLowerCase().includes(newSearchTerm) ||
        row.barcode.toString().toLowerCase().includes(newSearchTerm)
    );

    console.log("Filtered Products:", newFilter);

    const suggestions = newFilter.slice(0, 3);

    console.log("Suggested Products:", suggestions);

    setSuggestedProducts(suggestions);
  };const handleSuggestionClick = (product) => {
    // Check if the product is already in selectedProducts
    const isProductSelected = selectedProducts.some(
      (selectedProduct) => selectedProduct._id === product._id
    );
  
    if (!isProductSelected && product.quantity > 0 && product.newQuanity === 1) {
      // If not, add the product to selectedProducts
      const updatedProduct = { ...product, totalPrice: product.priceofsell };
      setSelectedProducts([...selectedProducts, updatedProduct]);
      setSearchTerm("");
      setSuggestedProducts([]);
    } else if (isProductSelected) {
      // If the product is already selected, display an alert
      window.alert('Ky produkt është aktualisht ne tabel.');
    } else {
      // If quantity is 0, display an alert
      window.alert('Nuk kemi sasi për këtë produkt.');
    }
  };
  
  const combinedProducts = [...selectedProducts, ...filteredProducts];
  console.log("All Array:", combinedProducts);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const calculateTotal = () => {
    
    const totalOrderAmount = combinedProducts.reduce((acc, product) => {
      return acc + (product.totalPrice || 0);
    }, 0);

    setTotalOrderAmount(totalOrderAmount);
  };
  const krijoporosi = async (e) => {
    e.preventDefault();

    try {
      calculateTotal();

      const orderPayload = combinedProducts.map(
        ({
          _id,
          title,
          product,
          quantity,
          barcode,
          newQuanity,
          priceofsell,
          totalPrice,
        }) => ({
          _id,
          title,
          product,
          quantity,
          barcode,
          newQuanity,
          priceofsell,
          totalPrice,
        })
      );

      console.log("Sending the following order:", orderPayload);

      const response = await axios.post("http://localhost:8000/api/order", {
        products: orderPayload,
        totalAmount: totalOrderAmount,
      });
      console.log(orderPayload);
      console.log("totalllll" + totalOrderAmount);
      console.log("no bar code" + response.data);

      // Update quantities in the main product list
      const updatedProducts = allProducts.map((product) => {
        const selectedProduct = combinedProducts.find(
          (p) => p._id === product._id
        );

        if (selectedProduct) {
          const updatedQuantity = product.quantity - selectedProduct.newQuanity;

          // Update the product quantity
          axios.put(`http://localhost:8000/api/product/${product._id}`, {
            quantity: updatedQuantity,
          });

          return { ...product, quantity: updatedQuantity };
        }

        return product;
      });

      setAllProducts(updatedProducts);
      clearSelectedProducts();
      setFilteredProducts([]);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const plus = (productId) => {
    const updatedProducts = selectedProducts.map((product) => {
      if (product._id === productId) {
        const updatedQuantity = product.newQuanity + 1;
        const priceOfProduct = product.priceofsell;

        console.log("updatedQuantity:", updatedQuantity);
        console.log("priceOfProduct:", priceOfProduct);

        // Check if the updatedQuantity exceeds the original quantity (stock)
        if (updatedQuantity <= product.quantity) {
          let totalPrice = priceOfProduct * updatedQuantity;

          console.log("totalPrice:", totalPrice);

          return {
            ...product,
            newQuanity: updatedQuantity,
            totalPrice: totalPrice,
          };
        } else {
          // If the updatedQuantity exceeds the stock, return the product without modification
          return product;
        }
      } else {
        return product;
      }
    });

    // Update the state with the modified products
    setSelectedProducts(updatedProducts);
  };

  const minus = (productId) => {
    const updatedProducts = selectedProducts.map((product) => {
      if (product._id === productId) {
        const updatedQuantity = Math.max(product.newQuanity - 1, 0); // Ensure newQuanity doesn't go below 0
        const priceOfProduct = product.priceofsell;

        console.log("updatedQuantity:", updatedQuantity);
        console.log("priceOfProduct:", priceOfProduct);

        let totalPrice = priceOfProduct * updatedQuantity;

        console.log("totalPrice:", totalPrice);

        if (updatedQuantity === 0) {
          // If newQuanity becomes 0, do not include the product in the updatedProducts array
          return null;
        }

        return {
          ...product,
          newQuanity: updatedQuantity,
          totalPrice: totalPrice,
        };
      } else {
        return product;
      }
    });

    // Update the state with the modified products
    setSelectedProducts(updatedProducts.filter((product) => product !== null));
  };

  const clearSelectedProducts = () => {
    localStorage.removeItem("selectedProducts");
    setSelectedProducts([]);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <form onSubmit={krijoporosi}>
                <div className="row"></div>
                <div className="row mt-4">
                  <div className="custom-scanning-input-bar d-flex">
                    <div>
                      <input
                        onChange={tableFilter}
                        className="custom-scanning-input-bar"
                        value={searchTerm}
                        style={{ border: "0", outline: "none", flexGrow: "1" }}
                        type="text"
                        placeholder="Shit Produktin ...."
                      />
                    </div>
                 

                    {suggestedProducts.length > 0 && (
                      <ul className="suggestions-list">
                        {suggestedProducts.map((product) => (
                          <li
                            key={product._id}
                            onClick={() => handleSuggestionClick(product)}
                          >
                            {product.product}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <DataTable
                  className="table"
                  columns={column}
                  data={combinedProducts}
                  pagination
                  selectableRows
                  highlightOnHover
                  striped
                  pointerOnHover
                />

                <button>Krijo</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Krijoporosi;
