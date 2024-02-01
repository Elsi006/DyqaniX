import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faFileExcel,
  faHeart,
  faHome,
  faList,
  faPen,
  faTable,
  faTrash,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
const Shtoprodukt = (props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [title , setTitle] = useState('') 
  const [product , setProduct] = useState('')  
  const [barcode , setBarcode] = useState('') 
  const [quantity , setQuantity] = useState('')  
  const [priceofpurchase , setPriceofpurchase] = useState('')  
  const [priceofsell , setPriceofsell] = useState('')  
  const [newQuanity , setNewQuanity] = useState(1)  
  const [totalPrice , setTotalPrice] = useState(0)  
  
  const [errorMessage , setErrorMessage] = useState('')

  const navigate = useNavigate()
  const navigateBack = () => {
    navigate(-1)
}


  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };



  const createProduct = (e) => {
    e.preventDefault()

    if(title.length <2 || product.length <2 ){
        setErrorMessage("your Form have some issues")
    }
    else{
      axios.post('http://localhost:8000/api/product', {
        
        title,
        product,
        barcode,
        quantity,
        priceofpurchase,
        priceofsell,
        newQuanity,
        totalPrice,

    })
    
    .then(res =>{
        console.log(res); 
        navigate('/inventar');
       

    })
    .catch(err => {
        setErrorMessage('Cannot create a new product')
        console.log(err);
    })
 
 }

}

  return (
    <>
 

 <div className="container my-5">
    <div className="row justify-content-center">
    <div className="col-md-12 mt-4">
        <div className="card">
          <div className="card-body">

            <h4 className="card-title mb-4">Shto Produkt</h4>

            <form onSubmit={(e)=> createProduct(e)}>
          

              <div className="form-group mb-3">
                <label htmlFor="exampleInputName1">Emri Produktit</label>
                <input type="text" className="form-control "
                  id="exampleInputName1" name="client" required maxLength="30" value={title} onChange={(e)=> setTitle(e.target.value)} 
              ></input>
                <span className="text-danger">
            
                </span>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="exampleInputName2">Specifikat</label>
                <input type="text" className="form-control"
                  id="exampleInputName2" name="clientTwo" required maxLength="30" value={product} onChange={(e)=> setProduct(e.target.value)} 
                ></input>
                <span className="text-danger">
            
                </span>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="exampleInputName3">Kodi Produktit</label>
                <input type="number" className="form-control"
                  id="exampleInputName3" name="productCode" required maxLength="40" value={barcode} onChange={(e)=> setBarcode(e.target.value)} 
               ></input> 
                <span className="text-danger">
               
                </span>
              </div>

          

              <div className="form-group mb-3">
                <label htmlFor="exampleInputQuantity">Sasia</label>
                <input type="number" className="form-control"
                  id="exampleInputQuantity" name="quantity" required min="1" value={quantity} onChange={(e)=> setQuantity(e.target.value)} 
                 ></input>
                <span className="text-danger">
                
                </span>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="exampleInputUnit">Cmimi i Blerjes</label>
                <input type="number" className="form-control "
                  id="exampleInputUnit" name="unit" required maxLength="30" value={priceofpurchase} onChange={(e)=> setPriceofpurchase(e.target.value)} 
                ></input>
                <span className="text-danger">
              
                </span>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="exampleInputSpecification">Cmimi i Shitjes</label>
                <input type="number"
                  className="form-control "
                  id="exampleInputSpecification" name="productSpecification" required maxLength="30" value={priceofsell} onChange={(e)=> setPriceofsell(e.target.value)} 
                  ></input>
                <span className="text-danger">
               
                </span>
              </div>

        
          

           

             

          

              <div className="form-group">
                <button type="submit" className="btn btn-primary me-2 form-control" >Shto</button>
                <Link to={"/inventar"} className="btn btn-light form-control">Kthehu</Link>
             
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>

    </>
  );
};

export default Shtoprodukt;
