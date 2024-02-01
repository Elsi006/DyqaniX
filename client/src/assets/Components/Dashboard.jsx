import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../View/Navbar";
import { Chart } from 'chart.js';
import 'chart.js/auto'; 

const Dashboard = (props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/orders");
        setAllOrders(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const totalProducts = allProducts.length;
  const productsWithLessThan5Quantity = allProducts.filter(product => product.quantity < 5).length;
  const totalOrders = allOrders.length;
  const generateChartData = (orders) => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
  
    const dataMap = {};
  
    // Aggregate total amount by date for the last week
    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt).toLocaleDateString();
  
      if (new Date(order.createdAt) >= lastWeek) {
        if (!dataMap[orderDate]) {
          dataMap[orderDate] = 0;
        }
  
        order.products.forEach((product) => {
          const productTotal = product.totalPrice;
          dataMap[orderDate] += productTotal;
        });
      }
    });
  
    // Convert dataMap to arrays for Chart.js
    const labels = Object.keys(dataMap);
    const data = Object.values(dataMap);
  
    return { labels, data };
  };
  
  
  const renderChart = (chartData) => {
    const ctx = document.getElementById('visit-sale-chart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Shitje Total',
          data: chartData.data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/orders`)
      .then((res) => {
        const chartData = generateChartData(res.data.products);
        renderChart(chartData);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []); 

  return (
    <>
      <Navbar></Navbar>
      <div className="custom-btn-container pl-4">
        <button className="btn btn-primary">
          <i className="fas fa-chart-simple"></i> Panel Admin
        </button>
        <Link to={'/inventar/krijo_user/'} className="btn btn-primary">
          Krijo User
        </Link>
      </div>

      <div className="container-fluid">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-4 d-flex">
              <div className="card card-img-holder flex-fill">
                <div className="card-body d-flex flex-column">
                  <h4 className="font-weight-normal mb-3">
                    Totali i produkteve
                  </h4>
                  <h2 className="mb-5">{totalProducts}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex">
              <div className="card card-img-holder flex-fill">
                <div className="card-body d-flex flex-column">
                  <h4 className="font-weight-normal mb-3">
                    Totali i porosive
                  </h4>
                  <h2 className="mb-5">{totalOrders}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex">
              <div className="card bg-gradient-success card-img-holder flex-fill">
                <div className="card-body d-flex flex-column">
                  <h4 className="font-weight-normal mb-3">
                    Produkte ne mbarim
                  </h4>
                  <h2 className="mb-5">{productsWithLessThan5Quantity}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 pt-12">
              <div className="card">
                <div className="card-body">
                  <div className="chart-container" style={{ height: "400px" ,  }}>
                  <canvas id="visit-sale-chart" className="mt-4"></canvas>
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

export default Dashboard;
