import React from 'react';
import "../App.css";
import { Link } from 'react-router-dom'

function header() {
  return (
    <div>
        <div className="list-books-title">
        <Link to='/' >
                    <h1>  My reads </h1>
            </Link>
      </div>
      
    </div>
  )
}

export default header
