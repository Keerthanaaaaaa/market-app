import React, { useState } from 'react'
import { useNavigate } from "react-router";
import auth from '../../apis/auth';

const fakeLogin = ()=>{
        localStorage.setItem(
                'auth',
                JSON.stringify({
                    token: "fake token"
                })
        )
}

const onLogin = async (e, inp,navigate) => {
        e.preventDefault();
        let {employee_id,password} = inp;
        const response = await auth.post('/login',{employee_id,password});
        if(response.data.status === "ok"){
                localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            token: response.data.data.token
                        })
                )
                navigate("/",{ replace: true });
        }
        else{
                console.log(response.data.error.message);
        }
};
const Login = (props)=>{
        let navigate = useNavigate();

        let [inp, setInp] = useState({employee_id:"",password:""});
        return (<div>
                        <h1>Login</h1>

                        <form onSubmit={(e)=>{onLogin(e,inp,navigate)}}>
                                <div className="row mb-3">
                                        <label htmlFor="inputID" className="col-sm-2 col-form-label">Employee ID</label>
                                        <div className="col-sm-10">
                                        <input type="string" className="form-control" id="inputID"
                                        value = {inp.employee_id}
                                        onChange = {(e)=> setInp({...inp,employee_id: e.target.value})}
                                        />
                                        </div>
                                </div>
                                <div className="row mb-3">
                                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                        <input type="password" className="form-control" id="inputPassword"
                                        value = {inp.password}
                                        onChange = {(e)=> setInp({...inp,password: e.target.value})}/>
                                        </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                                <button type="button" className="btn btn-outline-primary me-2" 
                                        onClick={()=>{
                                                fakeLogin();
                                                navigate("/",{ replace: true });
                                        }}>Fake Login
                                </button>
                                </form>
                </div>)
}


export default Login;