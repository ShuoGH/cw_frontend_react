import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Staff.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
//this is used to list the staff.

export default class Staff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      staff: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const staff = await this.staff();
      this.setState({ staff });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  staff() {
    console.log("to get the api")
    return API.get("staff", "/staff");
  }
  //this is the url when you invoke your api.
  //here you can get the staff properly. but why can't work after get in the specific item? ---13:39 13-11-2018 
  renderStaffList(staff) {
    return [{}].concat(staff).map(
      (user, i) =>
        i !== 0
          ? <LinkContainer
              key={user.userid}
              to={`/profile/${user.userid}`}   
            >   
              <ListGroupItem header={user.userid}>
                {"email: " + user.email}   
                {"    Created: " + new Date(user.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/profile/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new user
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }
  //when the i ==0, create the item which is the "create a new project" ---18:18 09-11-2018
  renderStaff() {
    return (
      <div className="user">
        <PageHeader>Staff</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderStaffList(this.state.staff)} 
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Staff">
        {this.renderStaff()}   
      </div>
    );
  }
}
//1. edition v1.0 for the staff list page.  ---13:54 12-11-2018 fixed bugs v1.0 ---22:25 12-11-2018
//2. need change the style of showing the staff. not userid, how to show the username.---22:26 12-11-2018  (how?)
