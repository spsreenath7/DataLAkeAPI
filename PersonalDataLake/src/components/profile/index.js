import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import userdetail from '../../datastore/userdetail';
import localCache from '../../datastore/localCache';
import request from 'superagent';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      status: '',
      name: '',
      email: '',
      gender: '',
      contact: '',
      previousDetails: {
        name: '',
        email: '',
        gender: '',
        contact: ''
      }
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {

    // console.log('in profile component mount ' + this.props.usersid);
    // const userid=this.props.match.params.userid;
    // console.log("In profile : "+userid);
    // let user = userdetail.get(parseInt(userid));
    let profile= localCache.getProfile();
    console.log("Comp did mount")
    console.log(localCache.getUser());
    this.setState({
      status: '',
      name: profile.name,
      email: profile.email,
      gender: profile.gender,
      contact: profile.contact,
      previousDetails: {
        name: profile.name,
        email: profile.email,
        gender: profile.gender,
        contact: profile.contact
      }
    });
  }

  handleEdit(e) {
    console.log("In Edit profile");
    this.setState({ status: 'edit' });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSave = (e) => {
    e.preventDefault();
    let updatedName = this.state.name.trim();
    let updatedEmail = this.state.email.trim();
    let updatedGender = this.state.gender.trim();
    let updatedContact = this.state.contact.trim();
    localCache.updateProfile({
      name: updatedName,
      email: updatedEmail,
      gender: updatedGender,
      contact: updatedContact
    });
    let user = localCache.getUser();
    // userdetail.update(this.state.previousDetails.email,
    //   updatedName, updatedEmail, updatedGender, updatedContact);

    const userid = this.props.match.params.userid;
    let updateurl = 'http://localhost:3001/users/' + userid;

    request.put(updateurl).send(user).end((error, res) => {
      if (res) {
        console.log(" request success!");
        // console.log(localCache.update(act));
        console.log("Updated user ");
        console.log(user);
        this.setState({
          status: '',
          previousDetails: {
            name: updatedName,
            email: updatedEmail,
            gender: updatedGender,
            contact: updatedContact
          }
        })
      } else {
        console.log(error);
      }
    });


    // let { name, email, gender, contact } = this.state;
    // this.setState({
    //   status: '',
    //   previousDetails: { name, email, gender, contact }
    // })

  };  // Implemented later

  handleCancel = () => {
    let { name, email, gender, contact } = this.state.previousDetails;
    this.setState({
      status: '',
      name, email, gender, contact
    });
  };

  render() {
    console.log('In Profile render ..');
    return (
      <div>
        <div>
          <h1>Your Profile</h1>
          <Button color="link" size="lg" disabled={this.state.status === 'edit'} onClick={this.handleEdit}>Edit detail</Button>
        </div>

        {this.state.status === 'edit' ?
          [<Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input value={this.state.name} onChange={this.handleChange} type="text" name="name" id="name" placeholder="your name" />
            </FormGroup>
            <FormGroup>
              <Label for="emailAddress">Email</Label>
              <Input value={this.state.email} onChange={this.handleChange} type="text" name="email" id="emailAddress" placeholder="your email" disabled={true} />
            </FormGroup>
            <FormGroup>
              <Label for="genderSelect">Select</Label>
              <Input value={this.state.gender} onChange={this.handleChange} type="select" name="gender" id="genderSelect">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="contactNum">Contact</Label>
              <Input value={this.state.contact} onChange={this.handleChange} type="text" name="contact" id="contactNum" placeholder="contact number" />
            </FormGroup>
            <Button color="success" onClick={this.handleSave}>Save</Button>{'     '}
            <Button color="info" onClick={this.handleCancel}>Cancel</Button>{' '}

          </Form>] :
          [<ListGroup>
            <ListGroupItem >
              <ListGroupItemHeading>Name</ListGroupItemHeading>
              <ListGroupItemText>
                {this.state.name}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Email</ListGroupItemHeading>
              <ListGroupItemText>
                {this.state.email}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Gender</ListGroupItemHeading>
              <ListGroupItemText>
                {this.state.gender}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Contact</ListGroupItemHeading>
              <ListGroupItemText>
                {this.state.contact}
              </ListGroupItemText>
            </ListGroupItem>
          </ListGroup>]
        }

      </div>
    );
  }
}
