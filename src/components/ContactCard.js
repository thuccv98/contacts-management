import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user.jpg';

const ContactCard = (props) => {
  const { id, name, number } = props.contact;

  return (
    <div className="item">
      <img src={user} alt="user" className="ui avatar image" />
      <div className="content">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header">{name}</div>
          <div>{number}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: 'red', marginTop: '7px' }}
        onClick={() => props.clickHander(id)}
      ></i>
    </div>
  );
};

export default ContactCard;
