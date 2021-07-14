import React from 'react';

class EditContact extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, number } = props.location.state.contact;
    this.state = {
      id,
      name,
      number,
    };
  }

  update = (e) => {
    e.preventDefault();
    if (this.state.name === '' || this.state.number === '') {
      alert('All the fields are mandatory');
      return;
    }
    this.props.updateContactHandler(this.state);
    this.setState({ name: '', number: '' }); // remove text in input after submit
    this.props.history.push('/'); //back to home
  };

  render() {
    return (
      <div className="ui segment">
        <h2>Edit Contact</h2>
        <form className="ui form" onSubmit={this.update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input
              type="text"
              name="number"
              placeholder="Phone Number"
              value={this.state.number}
              onChange={(e) => this.setState({ number: e.target.value })}
            />
          </div>
          <button className="ui button blue">Update</button>
        </form>
      </div>
    );
  }
}

export default EditContact;
