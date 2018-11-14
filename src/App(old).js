import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown,MenuItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";

//use class to create a react component.
//it's the sub class of react.component. we also define the render() in the last.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      isAdmin:true,
      isManager:true,
      username:"USER",
      //define the isadmin flag to record the flag whether the user is admin.
      //define the isManager flag to record the state whether the user is manager of one project.
    };
  }
  async componentDidMount() {
    try {
      await Auth.currentSession();
      // console.log("checking the session")
      this.userHasAuthenticated(true);
      // console.log("checked the session")
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }
//this is used to update the flag which is used to indicate whether user has logged in.
userHasAuthenticated = authenticated => {
  this.setState({ isAuthenticated: authenticated });
}

handleLogout = async event => {
  await Auth.signOut();

  this.userHasAuthenticated(false);
  this.props.history.push("/");
}
//this can clear the session on log out
//and return to the home page of the application 

render() {
//this is what will be used in the child class, super() and the this...
  const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      isAdmin:this.isAdmin,   //this is going to pass to the child components.
      isManager:this.isManager, //store the info of user.
      username:this.username,  //this is going to show in the navbar.
  };
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Management System</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.state.isAuthenticated
              ? <Fragment>
              <NavDropdown title={this.state.username} id="Navdropdown">
              <LinkContainer exact to="/" activeClassName=""> 
              <MenuItem eventkey="0">Main Page</MenuItem>
              </LinkContainer>
              <LinkContainer exact to="/staff/New" activeClassName=""> 
              <MenuItem eventkey="1">Create user</MenuItem>
              </LinkContainer>
              <LinkContainer exact to="/profile" activeClassName="">
              <MenuItem eventkey="2">update profile</MenuItem>
              </LinkContainer>
              <LinkContainer exact to="/projectslist" activeClassName="">
              <MenuItem eventkey="3">Projects</MenuItem>
              </LinkContainer>
              <LinkContainer exact to="/stafflist" activeClassName="">
              <MenuItem eventkey="4">Staff List</MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <LinkContainer exact to="/" activeClassName="">
              <MenuItem eventkey="5" onClick={this.handleLogout}>Logout</MenuItem>
              </LinkContainer>
              </NavDropdown>
                </Fragment>
              : <Fragment>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
    </Fragment>
}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes childProps={childProps} />
    </div>
  );
}
}
export default withRouter(App);
//expression: ? : is the expression of "if then else" 
//1. use the dropdown menu to list the option which user can choose. see the profile and the projects, and can choose to logout 
//2. use admin to develop the frontend.---10:40 12-11-2018
//3. add the staff list page for the app ---10:40 12-11-2018