import React, { Component } from 'react'
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class AddDonorDetailsComponent extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
            name:'',
            blood_group:'',
            address:'',
            age:'',
            mobile:''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeBloodHandler = this.changeBloodHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeAgeHandler = this.changeAgeHandler.bind(this);
        this.changeMobileHandler = this.changeMobileHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
    }
    componentDidMount() {

        const currentUser = AuthService.getCurrentUser();
    
        if (currentUser==null) 
        {
          this.props.history.push("/login")
        }
        else if(currentUser.roles.includes("ROLE_ADMIN"))
        {
          this.setState({ 
            currentUser: currentUser,
            isAdmin: currentUser.roles.includes("ROLE_ADMIN")
          })
        }
        else
        {
          alert("You are not authorized to access page")
          this.props.history.push("/profile")  
        }   
      }


    saveHandler=(event)=>
    {
        event.preventDefault();
        let donor = {name:this.state.name, blood_type:this.state.blood_group, area:this.state.address,age:this.state.age,mobile:this.state.mobile};
        UserService.addDonorDetails(donor).then(res=>{
            this.props.history.push("/show_blood_donor")
        });
    }
    changeNameHandler=(event)=>
    {
        this.setState({
            name:event.target.value
        })
    }
    changeBloodHandler=(event)=>
    {
        this.setState({
            blood_group:event.target.value
        })
    }
    changeAddressHandler=(event)=>
    {
        this.setState({
            address:event.target.value
        })
    }
    changeAgeHandler=(event)=>
    {
        this.setState({
            age:event.target.value
        })
    }
    changeMobileHandler=(event)=>
    {
        this.setState({
            mobile:event.target.value
        })
    }
    render() {
        return (
            <div>
                <div className='row'>
                    <div className="card col-md-6 offset md-3 offset md-3">
                        <h3 className='text-center'> Add Donor Details </h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label> Name of the Person </label>
                                    <input placeholder='Enter Name of the Person Here' className='form-control'
                                        value={this.state.name} onChange={this.changeNameHandler}/>
                                    <label> Blood Group </label>
                                    <input placeholder='Enter Blood Group' className='form-control'
                                        value={this.state.blood_group} onChange={this.changeBloodHandler}/>
                                    <label> Address of the Blood Bank </label>
                                    <input placeholder='Enter Address Here' className='form-control'
                                        value={this.state.address} onChange={this.changeAddressHandler}/>
                                    <label> Age </label>
                                    <input placeholder='Enter Age' className='form-control'
                                        value={this.state.age} onChange={this.changeAgeHandler}/>
                                    <label> Contact Info </label>
                                    <input placeholder="Enter Mobile Number" className='form-control' 
                                        value={this.state.mobile} onChange={this.changeMobileHandler}/>
                                </div>
                                <button className="btn btn-success" onClick={this.saveHandler}> Save </button>
                            </form>
                        
                        </div>   
                    
                    </div>

                </div>
            </div>
        )
    }
}