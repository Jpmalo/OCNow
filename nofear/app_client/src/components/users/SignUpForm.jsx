import React, { Component } from "react";
import axios from "axios";

// import FormStates from "../../helpers/FormStates";
// import FormBtns from "./FormBtns";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
        this.submit = this.submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);    
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    submit(e) {
        e.preventDefault();
        console.log('SUBMIT FORM');
        console.log('this: ', this.state)
        axios.post("/api/signup", this.state).then(resp => {
                console.log(resp);
                console.log(this.props)
                window.localStorage.setItem("token", resp.data.jwt)
                window.location="/";
                // this.props.history.push("/");
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        // let readOnly = false;
        // if(this.props.formState === FormStates.view) {
        //     readOnly = true;
        // }
        return (
            <div>
                <form onSubmit={this.submit}> 
                    {/*  PENDING TO MODIFY ON CHANGE */}
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" type="text" className="form-control" name="firstName" placeholder="First Name" onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input id ="lastName" type="text" className="form-control" name="lastName" placeholder="Last Name" onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id ="email" type="email" className="form-control" name="email" placeholder="email" onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" className="form-control" name="password" placeholder="password"  onChange={this.handleInputChange}/>
                    </div>

                    <button className="btn btn-default navbar-btn">Sign Up!</button>

                    {/* <div className="clearfix">
                        <FormBtns handleDelete = {this.props.handleDelete} 
                        handleEdit={this.props.handleEdit} 
                        formState = {this.props.formState} 
                        handleSubmit={this.props.handleSubmit}/>
                    </div> */}

                </form>
            </div>
        )
    }
}

export default SignUpForm;


