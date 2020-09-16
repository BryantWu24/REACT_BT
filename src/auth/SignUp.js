import React from 'react';
import { NavLink } from 'react-router-dom';

import '../assets/scss/style.scss';
import Aux from "../hoc/_Aux";
import Breadcrumb from "../App/layout/AdminLayout/Breadcrumb";
import { toast } from 'react-toastify';
import { apiOpenApiSetAccount } from '../core/api';

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            pwd: "",
            account: ""
        }

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
        this.doSignUp();
    }

    doSignUp = () => {
        this.setState({ submitted: true });
        const { account, password, email, name } = this.state;
        if (account && password && email && name) {
            const body = {
                "account": account,
                "pwd": password,
                "email": email,
                "name": name
            };

            apiOpenApiSetAccount(body)
                .then(res => {
                    if (res.data.setStatusCode === 200) {
                        toast.success("You can login your account now.")
                        this.props.history.push("/auth/signin");
                    }
                })
                .catch(err => {
                    toast.error("Omg...This is error. ErrorMessage = " + err);
                });
        } else {
            toast.error("Please enter complete info.");
        }
    }

    render() {

        const { name, account, email, pwd } = this.state;
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
                                    <i className="feather icon-user-plus auth-icon" />
                                </div>
                                <h3 className="mb-4">Sign up</h3>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Username" value={account} name="account" onChange={this.handleChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Username" value={name} name="name" onChange={this.handleChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email" value={email} name="email" onChange={this.handleChange} />
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password" value={pwd} name="pwd" onChange={this.handleChange} />
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.handleSubmit}>Sign up</button>
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin-1">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp;