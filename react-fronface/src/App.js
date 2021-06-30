import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import ShowBloodBank from "./components/ShowBloodBank";
import ShowBloodDonor from "./components/ShowBloodDonor";
import AddDonorDetails from "./components/AddDonorDetailsComponent";
import AddBankDetails from "./components/AddBloodBankComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showUserBoard:false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showUserBoard: user.roles.includes("ROLE_USER"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard,showUserBoard} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/profile"} className="navbar-brand">
            Blood Bank Management App
          </Link>
          <div className="navbar-nav mr-auto">

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/add_donor_details"} className="nav-link">
                  Add Donor
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/add_bank_details"} className="nav-link">
                  Add Bank
                </Link>
              </li>
            )}
            {(showAdminBoard || showUserBoard) &&(
              <li className="nav-item">
                <Link to={"/show_blood_bank"} className="nav-link">
                  Show Bank
                </Link>
              </li>
            )}
            {(showAdminBoard || showUserBoard) &&(
              <li className="nav-item">
                <Link to={"/show_blood_donor"} className="nav-link">
                  Show Donor
                </Link>
              </li>
            )}   
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/show_blood_bank" component={ShowBloodBank} />
            <Route path="/show_blood_donor" component={ShowBloodDonor} />
            <Route path="/add_donor_details" component={AddDonorDetails} />
            <Route path="/add_bank_details" component={AddBankDetails} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
