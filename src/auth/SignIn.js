import React from 'react';
import { NavLink } from 'react-router-dom';
import { apiOpenApiLogin } from '../core/api';
import '../assets/scss/style.scss';
import Aux from "../hoc/_Aux";
import Breadcrumb from "../App/layout/AdminLayout/Breadcrumb";
import { toast } from 'react-toastify';
class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            account: "",
            pwd: "",
            toastStatus: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = () => {
        this.doLogin();
    }

    setToast = (status) => {
        if (status === true) {
            this.setState({
                toastStatus: true
            });
        } else {
            this.setState({
                toastStatus: false
            });
        }
    }

    skipLogin = ()=>{
        sessionStorage.setItem('react_name','SKIP_ADMIN');
        this.props.history.push("/dashboard");
    }

    doLogin = () => {
        if(true){
            this.skipLogin();
        }else{
            sessionStorage.setItem('react_name', this.state.account);
            const { account, pwd } = this.state;
            if (account && pwd) {
                const body = {
                    "account": account,
                    "pwd": pwd
                };
                apiOpenApiLogin(body)
                    .then(res => {
                        if (res.data.setStatusCode === 200) {
                            sessionStorage.setItem('react_tkn',res.data.data.token);
                            sessionStorage.setItem('react_userId',res.data.data.userId);
                            this.props.history.push("/dashboard");
                        } else {
                            toast.error("Omg...This is error.");
                        }
                    })
                    .catch((err) => {
                        toast.error("Omg...This is error.",err);
                    });
            } else {
                toast.error("Please enter complete info.");
            }
        }
    }

    render() {
        const { pwd, account } = this.state;
        return (
            <Aux>
                <Breadcrumb />

                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r" />
                            <span className="r s" />
                            <span className="r s" />
                            <span className="r" />
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon" />
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="account" name="account" value={account} onChange={this.handleChange} />
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password" name="pwd" value={pwd} onChange={this.handleChange} />
                                </div>
                                {/* <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                        <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div> */}
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.handleSubmit}>Login</button>
                                {/* <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password">Reset</NavLink></p> */}
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignIn;