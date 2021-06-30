import React, { Component } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default class ShowBloodDonor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
      donors: []
    };
    this.deleteHandler = this.deleteHandler.bind(this);
  }
  deleteHandler(id)
  {
      UserService.deleteAdminDonor(id).then(res=>
        {
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
      UserService.getDonor().then(
        response => {
          this.setState({
            donors: response.data,
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
        <h2 className="text-center"> Donor Details </h2>
                <div className="row">
                    <table className = "table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th> Name </th>
                                <th> Blood Group </th>
                                <th> Age </th>
                                <th> Mobile </th>
                                <th> Area </th>
                                {this.state.isAdmin && (
                                <th> Actions </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.donors.map(
                                    donor=>
                                    <tr key={donor.id}>
                                        <td> {donor.name}</td>
                                        <td> {donor.blood_type}</td>
                                        <td> {donor.age} </td>
                                        <td> {donor.mobile} </td>
                                        <td> {donor.area} </td>
                                        {this.state.isAdmin && (
                                        <td> <button className="btn btn-primary" onClick={ () => this.deleteHandler(donor.id) }> Delete </button></td>
                                        )}
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
      </div>
    );
  }
}
