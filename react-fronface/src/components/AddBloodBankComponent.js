import React, { Component } from 'react'
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
export default class AddBloodBankComponent extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
            isAdmin:false,
            name:'',
            blood_group:'',
            address:'',
            unit:'',
            date:''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeBloodHandler = this.changeBloodHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeUnitsHandler = this.changeUnitsHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
    }
    componentDidMount() {

        const currentUser = AuthService.getCurrentUser();
    
        if (!currentUser) 
        {
          this.setState({ redirect: "/login" });
        }
        if(currentUser.roles.includes("ROLE_ADMIN"))
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
        let blood_bank = {name:this.state.name, blood_type:this.state.blood_group, address:this.state.address,units:this.state.unit,coll_date:this.state.date};
        UserService.addBankDetails(blood_bank).then(res=>{
            this.props.history.push("/show_blood_bank")
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
    changeUnitsHandler=(event)=>
    {
        this.setState({
            unit:event.target.value
        })
    }
    changeDateHandler=(event)=>
    {
        this.setState({
            date:event.target.value
        })
    }
    render() {
        return (
            <div>
                <div className='row'>
                    <div className="card col-md-6 offset md-3 offset md-3">
                        <h3 className='text-center'> Add Blood Bank </h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label> Name of Blood Bank </label>
                                    <input placeholder='Enter the Name of the Bank Here' className='form-control'
                                        value={this.state.name} onChange={this.changeNameHandler}/>
                                    <label> Blood Group </label>
                                    <input placeholder='Enter Blood Group' className='form-control'
                                        value={this.state.blood_group} onChange={this.changeBloodHandler}/>
                                    <label> Address of the Blood Bank </label>
                                    <input placeholder='Enter Address Here' className='form-control'
                                        value={this.state.address} onChange={this.changeAddressHandler}/>
                                    <label> Units Collected </label>
                                    <input placeholder='Enter Units Collected' className='form-control'
                                        value={this.state.units} onChange={this.changeUnitsHandler}/>
                                    <label> Collection Date </label>
                                    <input type='date' placeholder="dd-mm-yyyy" className='form-control' 
                                        value={this.state.date} onChange={this.changeDateHandler}/>
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
