import React, { useState , useEffect } from "react";
import axios from "axios";
import { Link, useNavigate ,useParams  } from 'react-router-dom'
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
const Editproduct = (props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [title , setTitle] = useState('') 
  const [product , setProduct] = useState('')  
  const [barcode , setBarcode] = useState('') 
  const [quantity , setQuantity] = useState('')  
  const [priceofpurchase , setPriceofpurchase] = useState('')  
  const [priceofsell , setPriceofsell] = useState('')  
  
  const [errorMessage , setErrorMessage] = useState('')
  const {id} = useParams()
 
  const navigate = useNavigate()
  const navigateBack = () => {
    navigate(-1)
}


  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };



  useEffect(() => {
    axios.get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        console.log("resdata", res.data);
        setTitle(res.data.product.title);
        setProduct(res.data.product.product);
        setBarcode(res.data.product.barcode);
        setQuantity(res.data.product.quantity);
        setPriceofpurchase(res.data.product.priceofpurchase);
        setPriceofsell(res.data.product.priceofsell);
 
       
    
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [id]);

const createProduct = (e) => {
    e.preventDefault()

    if(title.length <2 || product.length <2 ){
        setErrorMessage("your Form have some issues")
    }
    else{
        axios.put(`http://localhost:8000/api/product/${id}`,{
        title,
        product,
        barcode,
        quantity,
        priceofpurchase,
        priceofsell
    })
    .then(res =>{
  
        navigate('/inventar');

    })
    .catch(err => {
        setErrorMessage("Your api have some problems");
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
                <button type="submit" className="btn btn-primary me-2 form-control" >Ndrysho</button>
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

export default Editproduct;
