import React, { Component } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default class ShowBloodBank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
      banks: []
    };
    this.deleteHandler = this.deleteHandler.bind(this)
  }
  deleteHandler(id)
    {
        UserService.deleteAdminBank(id).then(res=>{
            window.location.reload(false);
        })
    }
  componentDidMount() {

    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) 
    {
      this.setState({ redirect: "/login" });
    }
    else
    {
      UserService.getBloodBank().then(
        response => {
          this.setState({
            banks: response.data,
          });
        })
    }
    if(currentUser.roles.includes("ROLE_ADMIN"))
    {
      this.setState({
        isAdmin:true
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center"> Blood Bank Blood Details </h2>
        <div className="row">
            <table className = "table table-stripped table-bordered">
              <thead>
                <tr>
                  <th> Name </th>
                  <th> Blood Group </th>
                  <th> Address </th>
                  <th> Units </th>
                  <th> Collection Date </th>
                  {this.state.isAdmin &&(
                    <th> Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {
                  this.state.banks.map(
                  bank=>
                  <tr key={bank.id}>
                    <td> {bank.name}</td>
                    <td> {bank.blood_type}</td>
                    <td> {bank.address} </td>
                    <td> {bank.units} </td>
                    <td> {bank.coll_date} </td>
                    {this.state.isAdmin && (
                    <td> <button className="btn btn-primary" onClick={ () => this.deleteHandler(bank.id) }> Delete </button></td>
                    )}
                    </tr>)
                }
              </tbody>
            </table>
          </div>
      </div>
    );
  }
}
