import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import api from './api/contacts';
import './App.css';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import EditContact from './components/EditContact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState([]);

  //RetriveContacts
  const retrieveContacts = async () => {
    const response = await api.get('/contacts');
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuidv4(),
      ...contact,
    };

    const response = await api.post('/contacts', request);

    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);

    const response = await api.get('/contacts');
    setContacts(response.data);

    // const newContactList = contacts.filter((contact) => {
    //   return contact.id !== id;
    // });

    // setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    // console.log(searchTerm);
    setSearchTerm(searchTerm);
    //logic  handle search
    if (searchTerm !== '') {
      //
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join('')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchFilter(newContactList);
    } else {
      setSearchFilter(contacts);
    }
  };

  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem('contact'));
    // if (retrieveContacts) setContacts(retrieveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchFilter}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
