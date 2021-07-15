import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user.jpg';

const ContactCard = (props) => {
  const { id, name, number } = props.contact;

  return (
    <div className="item" style={{ display: 'flex', padding: '15px' }}>
      <img src={user} alt="user" className="ui avatar image" />
      <div className="content" style={{ marginRight: 'auto' }}>
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header">{name}</div>
          <div>{number}</div>
        </Link>
      </div>
      <Link to={{ pathname: '/edit', state: { contact: props.contact } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: 'blue', marginTop: '7px' }}
        ></i>
      </Link>
      <i
        className="trash alternate outline icon"
        style={{
          color: 'red',
          marginTop: '7px',
          marginLeft: '10px',
          cursor: 'pointer',
        }}
        onClick={() => props.clickHander(id)}
      ></i>
    </div>
  );
};

export default ContactCard;
