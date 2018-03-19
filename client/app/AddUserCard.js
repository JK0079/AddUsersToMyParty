import React , { Component } from 'react';
//import { getRandomPicture } from 'api/RandomUsers';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
//import CountryCodes from 'CountryCodes';

export default class AddUserCard extends Component {

  onHandleAddUser(user) {
    this.props.handleAddUser(user);
  }

  onSubmitForm(e) {
    e.preventDefault();

      const person = this.props.selectedPerson.trim();
      const name = this.refs.name.value.trim();
      const address = this.refs.address.value.trim();
      const email = this.refs.email.value.trim();
      if(name && address && email && person) {

       const user = { name, address, email, person};
       this.onHandleAddUser(user);
       this.resetFields();

       var personInfo = {
         name_p: this.props.selectedPerson.trim()

       };
       console.log('in the did mount FROM ADD' +JSON.stringify(personInfo));

     fetch('/saveInfo', {
       method: 'post',
       body: JSON.stringify({invitee_name: name, invitee_add: address, invitee_email: email, invitee_type: person}),
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })
     .then(function (response) {
         return response.json();
     })
     .then(function (result) {
         alert(result);
          console.log("The file was saved!");
     })
     .catch (function (error) {
         console.log(JSON.stringify(error));
     });

       /*fetch('/saveInfo') //working
            .then(res => {
                console.log(res);
                return res.json()
             })
            .then(users => {
                console.log(users);
                this.setState({ users })
             });*/
       /*return fetch('/saveInfo', {
         method: 'post',
         body: JSON.stringify(personInfo),
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         }
       })
         .then(this.checkStatus)
         .then(()=>console.log(this.checkStatus));*/


     }   else {
        alert("Please input all fields correctly")
      }
  }

  resetFields(e) {
    if(e) {
      e.preventDefault();
    }
    this.refs.name.value = '';
    this.refs.address.value = '';
    this.refs.email.value = '';
    //this.props.person.value = '';

  }

  onToggleAddSection() {
    this.props.handleToggleAddSection();
  }

  onHandeChangeSelectedPerson(val) {
    const person = val ? val.value : '';
    this.props.handeChangeSelectedPerson(person);
  }

  onHandeChangeSelectedCountry(val) {
    const type = val ? val.value : '';
    this.props.handeChangeSelectedCountry(country);
  }

  getPersonSelectOptions() {
    return [
      { value: 'Mommy', label: 'Mommy', clearableValue: false },
      { value: 'Daddy', label: 'Daddy' , clearableValue: false},
      { value: 'Kiddo', label: 'Kiddo' , clearableValue: false},
      { value: 'Prince Charming', label: 'Prince Charming' , clearableValue: false},
      { value: 'Princess Shimmer', label: 'Princess Shimmer' , clearableValue: false}
    ];
  }

  getCountrySelectOptions() {
    const options = [];
    for( const country in CountryCodes ) {
      options.push({
        value: country,
        label: country
      })
    }
    return options;
  }

  render() {
    const isAddSectionVisible = this.props.isAddSectionVisible;
    const addSectionStyle = { display: isAddSectionVisible ? 'block' : 'none' };
    const plusOrMinusSign = isAddSectionVisible ? 'fa fa-minus fa-2x' : 'fa fa-plus fa-2x';
    const addOrRemoveText = isAddSectionVisible ? 'Hide' : 'Add User';

    return (

      <div>

        <i className = { plusOrMinusSign } onClick = { ::this.onToggleAddSection }></i> { addOrRemoveText }

        <div style = { addSectionStyle } className="col-lg-12 addUserSection">
          <form onSubmit = { ::this.onSubmitForm } >

            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="name" placeholder="Name" autoComplete = "off" ref = "name"/>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="phone" className="col-sm-2 col-form-label">Address</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="address" placeholder="Address" autoComplete = "off" ref = "address"/>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="phone" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="email" placeholder="Email" autoComplete = "off" ref = "email"/>
              </div>
            </div>

            <div className="form-group row">
                  <label htmlFor="gender" className="col-sm-2 col-form-label">Gender</label>
                  <div className="col-sm-10">
                    <Select
                      name="form-field-name"
                      value= { this.props.selectedPerson }
                      options={ this.getPersonSelectOptions() }
                      onChange={::this.onHandeChangeSelectedPerson}
                    />
                  </div>
                </div>

            <input className="btn btn-secondary mr-3" type="submit" value="Submit"/>
            <button className="btn btn-secondary" onClick={ ::this.resetFields }>Clear Fields</button>
          </form>
        </div>
      </div>
    );
  }
}
