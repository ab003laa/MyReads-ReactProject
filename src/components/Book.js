import React from 'react';
import ShelfChanger from './ShelfChanger';


function Book(props) {
  const { book, books, changeShelf } = props;

  const bookCover = book.imageLinks && book.imageLinks.thumbnail

  const title = book.title ? book.title : 'No title available';

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ backgroundImage: `url(${bookCover})` }}
          />
          <ShelfChanger book={book} books={books} changeShelf={changeShelf} />
        </div>
        <div className="book-title">{title}</div>
        {book.authors && book.authors.map((author, index) => 
        (<div className="book-authors" key={index}>{author}</div>))}
      </div>
    </li>
  );


  
}



export default Book;
