import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class LeftNavPan extends React.Component {
  render() {
    return (
      <div>
        <p>List Based</p>
        <Nav vertical>
          <NavItem>
            <NavLink href="#"><span class="glyphicon glyphicon-home"> Home</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#"><span class="glyphicon glyphicon-user"> Profile</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#"><span class="glyphicon glyphicon-list-alt"> PersonalData</span></NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#"><span class="glyphicon glyphicon-cog"> PrivacyDashboard</span></NavLink>
          </NavItem>
        </Nav>
        <hr />
      </div>
    );
  }
}