import React, { Component } from 'react';
//import ISO from 'api/ISO';
import img from '../images/pexels-photo-605408.jpg'

export default class UserCard extends Component {

    onRemoveUser() {
      this.props.onRemoveUser(this.props.currentUser);
    }

    render() {
      const { name,address,email,person } = this.props.user;

      const card =
        <div className="card text-center">
          <img className="card-img-top img-fluid rounded-circle hvr-grow w-100 p-3" src={img} alt="Card image cap"/>
          <div className="card-block">
            <h4 className="card-title">Name: { name }   </h4>
            <p className="card-text">Address: { address }  </p>
            <p>
              <a href={`mailto:${email}?Subject=Hello%20${name}`} target="_top">
                <i className = "fa fa-envelope"/> - { email }
              </a>
            </p>
            <p className="card-text">About Me: { person }  </p>

            <i className = 'fa fa-remove fa-2x float-right hvr-grow' onClick = { ::this.onRemoveUser }> </i>
          </div>
        </div>;
      return card;
    }
}
