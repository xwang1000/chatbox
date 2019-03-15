import React, {Component} from 'react'

function NavBar (props) {
  const getPlural = (n, word) => n === 1 ? word : word + 's'
  
  const number = props.numberOnline
  const users = getPlural(number, 'user')
  
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p style={{textAlign:'right'}} >{number} {users} online</p>
    </nav>
  )
}

export default NavBar