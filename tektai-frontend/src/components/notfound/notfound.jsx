import React from 'react'
import Header from '../../layout/Header'
import "./n.css"
export default function NotFound() {
  return (
    <div className='dbody'>
       <div class="noised"></div>
<div class="overlayf"></div>
<div class="terminal">
  <h1>Error <span class="errorcode">404</span></h1>
  <p class="output">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
  <p class="output">Please try to <a href="/">go back</a> or <a href="/">return to the homepage</a>.</p>
  <p class="output">Good luck.</p>
</div>
    </div>
  )
}
