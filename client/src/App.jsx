import { useState } from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom' 
 
import './App.css'
import Dashboard from './assets/Components/Dashboard'
import Inventari from './assets/Components/Inventari'
import Krijoporosi from './assets/Components/Krijoporosi'
import Historia from './assets/Components/Historia'
import Shtoprodukt from './assets/Components/Shtoprodukt'
import Importexel from './assets/Components/Importexel'
import Editproduct from './assets/Components/Editproduct'
import { formToJSON } from 'axios'
import { AuthProvider,useAuth } from './AuthContext'
import LoginPage from './assets/Components/LoginPage'
import KrijoUser from './assets/Components/KrijoUser'
import XhdoPorosi from'./assets/Components/XhdoPorosi'




function App() {



  const {user}=useAuth();
  const token = localStorage.getItem('token');

  return (


<BrowserRouter>
  
  <Routes>
  {token ? (
    <>
    <Route path='/' element={<Dashboard  user={user} />}/>
    <Route path='/inventar' element={<Inventari  user={user} />}/>
    <Route path='/inventar/krijo_user' element={<KrijoUser  />}/>
    <Route path='/krijoporosi' element={<Krijoporosi  user={user} />}/>
    <Route path='/historia' element={<Historia  user={user} />}/>
    <Route path='/historia/xhdo-histori/:id' element={<XhdoPorosi  user={user} />}/>
    <Route path='/inventar/shto_produkt' element={<Shtoprodukt  user={user} />}/>
    <Route path='/inventar/importo_exel' element={<Importexel  user={user} />}/>
    <Route path='/inventar/edit_product/:id' element={<Editproduct  user={user} />}/>

      
    </>
  ) : (
    <Route path='*' element={<LoginPage />}/>
  )}
   
    
  </Routes>
    
  </BrowserRouter>

  )
}

export default App







