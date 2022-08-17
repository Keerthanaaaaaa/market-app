import React from 'react'
import { useParams,useNavigate } from "react-router";
import products from '../../apis/products';
import { getToken } from '../../apis/token';

const goBack= (navigate) => {
        navigate("/products/",{ replace: true });
}

const deleteProduct = async (id,navigate)=>{
        let token = getToken();
        console.log(token);
        let response = await products.delete("/",{
                data: {id:parseInt(id)},
                headers:{ 'Authorization' : `Bearer ${token}`}
        });
        if(response.data.status === "ok"){
                navigate("/products/",{ replace: true });
        }
        else{
                console.log(response.data.error.message);
        }
}
const Delete = (props)=>{
        let navigate = useNavigate();
        let id = useParams().id
        return (<div className="middle">
        <h1 className='svl'>Delete Product</h1>

        <div className='svxl'>
                <h3>Are you sure want to delete this Product record?</h3>
                <button type="submit" className="btn btn-danger svxl sh"
                onClick = {(e)=>{deleteProduct(id,navigate)}}>Yes</button>
                <button type="button" className="btn btn-secondary me-2 svxl sh"
                onClick = {(e)=>{goBack(navigate)}}>
                        No
                </button>
        </div>
</div>)
}


export default Delete;
