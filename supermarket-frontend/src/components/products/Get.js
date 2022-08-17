import React,{useEffect, useState} from 'react'
import products from '../../apis/products';
import { getToken } from '../../apis/token';
import { Link, useNavigate } from "react-router-dom";


const getProducts= async (setProducts)=>{
    let token = getToken();
    //console.log(token);
    const response = await products.get('/',{
        headers:{
            'Authorization' : `Bearer ${token}`
        }});
    console.log(response);
    setProducts(response.data.data);
}

const getProductsWithFilters = async (e,setProducts, filters) => {
    Object.keys(filters).forEach((key)=>{
        if(!filters[key]){
            delete filters[key]
        }
    });
    console.log(filters);
    let token = getToken();
    const response = await products.get('/',{
        headers:{
            'Authorization' : `Bearer ${token}`
        },
        params: filters
    });
    console.log(response);
    setProducts(response.data.data);
}


const renderRecords = (products)=>{

    return products.map((product)=>{
        console.log(product);
        return(
            <tr key={product.id}>
                <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.batch}</td>
                    <td>{product.p_type}</td>
                     <td>{product.brand}</td>
                     <td>{product.price}</td>
                    <td>{product.stock}</td>
                    
                    <td><Link to={`/products/edit/${product.id}`}>Edit</Link></td>
                  <td><Link to={`/products/delete/${product.id}`}>Delete</Link></td>
            </tr>
        )
    })
}

const Get = (props) => {
    const [products, setProducts] = useState([]);

    const [filters, setFilters] = useState({id:"",name:"",batch:"",p_type:"",brand:"",price:"",stock:""});

    let navigate = useNavigate();

    useEffect(()=>{
        getProducts(setProducts);
    },[]);

    return (
        
        <div>
        
        <div className="d-flex justify-content-center py-3">
            <button type="button" className="btn btn-primary" 
            onClick={(e)=>{navigate("./create",{ replace: true })}}>
                Add a new Product</button>
        </div>
            <div className="row sv">
                <div className="col">
                <input type="text" className="form-control" placeholder="ID"
                value = {filters.id}
                onChange = {(e)=> setFilters({...filters,id: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
                <div className="col">
                <input type="text" className="form-control" placeholder="Name"
                value = {filters.name}
                onChange = {(e)=> setFilters({...filters,name: e.target.value})}/>
                </div>
            </div>
            <br></br>
            <div className="row sv">
                <div className="col">
                <input type="text" className="form-control" placeholder="p_type"
                value = {filters.p_type}
                onChange = {(e)=> setFilters({...filters,p_type: e.target.value})}/>
                </div>
                <div className="col">
                <input type="text" className="form-control" placeholder="Brand"
                value = {filters.brand}
                onChange = {(e)=> setFilters({...filters,brand: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
                <div className="col">
                <input type="text" className="form-control" placeholder="Price"
                value = {filters.price}
                onChange = {(e)=> setFilters({...filters,price: e.target.value})}/>
                </div>
            </div>
            <br></br>
            <button className="btn btn-primary sv sh"
            onClick={(e)=>{getProductsWithFilters(e,setProducts,filters)}}
            >Filter</button>
            <button className="btn btn-primary sv sh" onClick={()=>{setFilters({id:"",name:"",batch:"",p_type:"",brand:"",price:"",stock:""})}}>Clear</button>
        
        <table className="table">
            <thead>
                <tr>
                     <th scope="col">ID</th>
                     <th scope="col">Name</th>
                     <th scope="col">Batch</th>
                     <th scope="col">P_type</th>
                     <th scope="col">Brand</th>
                     <th scope="col">Price</th>
                     <th scope="col">Stock</th>
                     <th scope="col">#Edit</th>
                     <th scope="col">#Delete</th>
                </tr>
            </thead>
            <tbody>
            {renderRecords(products)}
            {console.log(filters)}
            </tbody>
        </table>

            
        </div>
        );
}

export default Get;
