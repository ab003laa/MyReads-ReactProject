import React from 'react';
import Book from './book';

const Bookshelf = (props) => {
  const shelfTypes = {
    'currentlyReading': 'Currently Reading',
    'wantToRead': 'Want to Read',
    'read': 'Read'
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTypes[props.shelf]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(b => <Book key={b.id} book={b} moveBook={props.moveBook} />)}
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;
