import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


import './SignUpStyle.css';


class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
            searchEmail: '',
            isloading: false

        }
    }

    searchButtonClicked = e => {
        this.setState({
            isloading: true
        })
        axios.get('/api/users/' + this.state.searchEmail)
            .then(res => {
                this.setState({
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    email: res.data[0].email,
                    password: res.data[0].password
                })
                this.setState({
                    isloading: false
                })
            })
    }


    searchEmailChangeHandler = e => {
        this.setState({
                searchEmail: e.target.value
            }
        )
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    updateClicked = e => {
        this.setState({
            isloading: false
        })
        console.log('update');
        if (this.state.password !== this.state.repeatPassword) {
            NotificationManager.error("Passwords you entered do not match", "Sorry", 2500);
            return;
        }
        axios({
            method: 'put',
            url: '/api/users/' + this.state.searchEmail,
            headers: {},
            data: {
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "email": this.state.email,
                "password": this.state.password
            }
        }).then(response => {
            NotificationManager.success("User updated successfully", "Done", 2500);
            this.setState({
                isloading: false
            })
        }).catch(error => {
            console.log(error);
        });

    }


    submitHandler = e => {
        e.preventDefault();

        if (this.state.password !== this.state.repeatPassword) {
            NotificationManager.error("Passwords you entered do not match", "Sorry", 2500);
            return;
        }
        axios({
            method: 'post',
            url: '/api/users',
            headers: {},
            data: {
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "email": this.state.email,
                "password": this.state.password
            }
        }).then(response => {
            console.log(response);
            swal({
                title: "Nice!",
                text: "You are registered successfully..!",
                icon: "success",
                button: "Go back to home",
            }).then((value) => {
                if (value) {
                    window.location.replace("/");
                }
            });
        }).catch(error => {
            console.log(error);
        });
    }


    render() {
        const {firstName, lastName, email, password, searchEmail} = this.state;
        return (
            <div>
                {this.state.isloading &&
                <div style={{backgroundColor: 'red'}} align="center">
                    <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                }
                <NotificationContainer/>
                <div align="center">
                    <div style={{width: '40%'}}>

                        <input type="text" value={searchEmail} placeholder="email..." name="searchEmail"
                               onChange={this.searchEmailChangeHandler}/>
                        <button onClick={this.searchButtonClicked} className="signupbtn">Search</button>

                        <form onSubmit={this.submitHandler} style={{border: '1px solid #ccc'}}>


                            <div className="container">
                                <h1>Sign Up</h1>
                                <p>Please fill in this form to create an account.</p>
                                <hr/>

                                <label><b>First Name</b></label>
                                <input type="text" value={firstName} placeholder="first name..." name="firstName"
                                       onChange={this.changeHandler} required/>

                                <label><b>Last Name</b></label>
                                <input type="text" value={lastName} placeholder="last name... "
                                       name="lastName" onChange={this.changeHandler} required/>

                                <label htmlFor="email"><b>Email</b></label>
                                <input type="text" value={email} placeholder="Enter Email" name="email"
                                       onChange={this.changeHandler} required/>

                                <label htmlFor="psw"><b>Password</b></label>
                                <input type="password" value={password} placeholder="Enter Password" name="password"
                                       onChange={this.changeHandler} required/>

                                <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                                <input type="password" placeholder="Repeat Password" name="repeatPassword"
                                       onChange={this.changeHandler} required/>


                                <div className="clearfix">
                                    <button type="submit" className="signupbtn">Sign Up</button>
                                </div>
                            </div>
                        </form>
                        <button className="cancelbtn" onClick={this.updateClicked}>Update</button>

                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
