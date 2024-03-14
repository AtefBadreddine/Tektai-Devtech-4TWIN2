import React from 'react';
import "./bank.css";

const Bankcard = ({ userData }) => {
  return (
    <div className="card-container">
      {userData.map((user, index) => (
        <aside className="card-front" key={index}>
          <label className="number" htmlFor="cardNumber">
            {user.name}
          </label>
          <label className="expiry" htmlFor="expiryMonth">
            {user.title}
          </label>
          <img className="cardLogo" src={user.imageUrl} alt="Card Logo" />
          
          <div className="chip">
          <img className="" src={user.flagImageUrl} alt="Card Logo" />

            {/* <svg role="img" viewBox="0 0 100 100" aria-label="Chip">
              <use href="#chip-lines" />
            </svg> */}
          </div>
          <svg className="contactless" role="img" viewBox="0 0 24 24" aria-label="Contactless">
            <use href="#contactless"/>
          </svg>
        </aside>
      ))}

      <svg id="chip">
        <g id="chip-lines">
          <polyline points="0,50 35,50"></polyline>
          <polyline points="0,20 20,20 35,35"></polyline>
          <polyline points="50,0 50,35"></polyline>
          <polyline points="65,35 80,20 100,20"></polyline>
          <polyline points="100,50 65,50"></polyline>
          <polyline points="35,35 65,35 65,65 35,65 35,35"></polyline>
          <polyline points="0,80 20,80 35,65"></polyline>
          <polyline points="50,100 50,65"></polyline>
          <polyline points="65,65 80,80 100,80"></polyline>
        </g>
      </svg>

      <svg id="contactless">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9.172 15.172a4 4 0 0 1 5.656 0"></path>
        <path d="M6.343 12.343a8 8 0 0 1 11.314 0"></path>
        <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"></path>
      </svg>
    </div>
  );
};

export default Bankcard;
