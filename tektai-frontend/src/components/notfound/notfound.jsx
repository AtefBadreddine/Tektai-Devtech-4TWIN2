import React from 'react'
import Header from '../../layout/Header'
import "./n.css"
import {Link} from "react-router-dom";
export default function NotFound() {
  return (
    <div className='dbody'>
       <div className="noised"></div>
<div className="overlayf"></div>
<div className="terminal">
  <h1>Error <span className="errorcode">404</span></h1>
  <p className="output">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
  <p className="output">Please try to <Link to="/" className="bg-blue-600">go back</Link> or <Link to="/" className="bg-blue-700">return to the homepage</Link>.</p>
  <p className="output">Good luck.</p>

</div>
    </div>
  )
}
