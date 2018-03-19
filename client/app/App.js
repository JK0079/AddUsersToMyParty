import React from 'react';
import UserCard from './UserCard';
import AddUserCard from './AddUserCard';
import _ from 'lodash';
import GenderSortDropdown from './GenderSortDropdown';
import SearchUserInput from './SearchUserInput';
import UserCardList from './UserCardList';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users : [],
      isAddSectionVisible: false,
      filterBy: 'All',
      query: '',
      defaultNumberOfRandomUsers: 6,
      eventName: 'My Party',
      selectedGender: '',
      selectedCountry: '',
      msg: 'begin'
    };
  };


   checkStatus(response) {
     console.log('chk stat!!!'+response.status);
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  };

    componentDidMount() {
      console.log('in the did mount ' +JSON.stringify(this.state));
      return fetch('/saveInfo', {
        method: 'get',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(this.checkStatus)
        .then(()=>console.log('updated!!!'));
  };


  removeUser(user) {
    const users = _.without(this.state.users, user);
    this.setState({ users });
  }

  addNewUser(user) {
    const users = this.state.users;
    users.push(user);
    this.setState({ users });
  }

  toggleAddSection() {
    this.setState({
      isAddSectionVisible: !this.state.isAddSectionVisible
    });
  }

  changeSelectedPerson(selectedPerson) {
    this.setState({ selectedPerson })
  }


  filterUsers(filterBy) {
    this.setState({ filterBy });
  }

  search(query) {
    this.setState({ query });
  }

  searchByQuery(users, query) {
    const newUsers = [];
    users.forEach(user => {
      if(
        (user.name.toLowerCase().includes(query)) ||
        (user.address.toLowerCase().includes(query))
      ) {
        newUsers.push(user);
      }
    });
    return newUsers;
  }

   render () {

     const currentUsers = this.state.users;
     const query = this.state.query.toLowerCase();

     let users = this.searchByQuery(currentUsers, query);

     if(this.state.filterBy.toLowerCase() !== 'all' ) {
       users = _.filter(users, user => user.name === this.state.filterBy.toLowerCase());
     }
        return (
            <div>

              <div className='row mb-3'>
                <div className = 'col-lg-12'>
                  <AddUserCard
                    handleAddUser = { ::this.addNewUser }
                    handleToggleAddSection = { ::this.toggleAddSection }
                    isAddSectionVisible = { this.state.isAddSectionVisible }
                    handeChangeSelectedPerson = { ::this.changeSelectedPerson }
                    selectedPerson = { this.state.selectedPerson }
                    />
                </div>
              </div>

              <div className='row mb-3'>
                <div className = 'col-lg-6'>
                  <form className="form-inline">
                    <div className='mr-3'>
                      <GenderSortDropdown
                        handleFilter = { ::this.filterUsers }
                        filterBy = { this.state.filterBy }
                      />
                    </div>
                    <SearchUserInput
                      handleSearch = { ::this.search }
                    />
                  </form>
                </div>
                <div className = 'col-lg-6'>
                  <h3 className = 'float-right' >
                   { users.length <= 0 ? <i className="em em-disappointed"/> : null }
                   { users.length } people attending { this.state.eventName }
                   </h3>
                </div>
              </div>

              <div className='row'>
                <div className = 'col-lg-12'>
                  <div className = 'card-columns'>
                    <UserCardList
                      theUsers = { users }
                      handleRemoveUser = { ::this.removeUser }
                    />
                  </div>
                </div>
              </div>

            </div>
        );
    }



}
