import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from "./ListContacts";
import * as ContactsAPI from './utils/ContactsAPI';
import CreatContact from "./CreateContact";



class App extends Component {
  state = {
    contacts:  [],
    screen: 'list'
  }
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) =>{
      this.setState({
        contacts: contacts
      })
    })
  }

  removeContact = (contact) => {
    this.setState((currState) =>({
      contacts: currState.contacts.filter((c) => {return c.id !== contact.id})
    }) )
    ContactsAPI.remove(contact)
  }
  createContact = (contact) => {
    ContactsAPI.create(contact)
        .then((contact) => {
          this.setState((currState)=>({
            contacts: currState.contacts.concat([contact])
          }))
        })

  }
  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
            <ListContacts
            contacts = {this.state.contacts}
            onDeleteContact = {this.removeContact}
        />)
        }/>
        <Route path='/create' render={({history})=>(
          <CreatContact
              onCreateContact={(contact) => {
                this.createContact(contact)
                history.push('/')
              }}
          />
        )}/>
      </div>

  );
  }
}

export default App;
