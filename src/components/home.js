import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './bookshelf';
import Footer from './Footer'


const Home = (props) => {
  return (
    <div className="list-books">
      
      <div className="list-books-content">
        <div>
          <Bookshelf
            shelf="currentlyReading"
            moveBook={props.moveBook}
            books={props.books.filter(book => book.shelf === "currentlyReading")}
          />
          <Bookshelf
            shelf="wantToRead"
            moveBook={props.moveBook}
            books={props.books.filter(book => book.shelf === "wantToRead")}
          />
          <Bookshelf
            shelf="read"
            moveBook={props.moveBook}
            books={props.books.filter(book => book.shelf === "read")}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add Book</Link>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
