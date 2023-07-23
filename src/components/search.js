import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './book';

const Search = (props) => {
  const [showingBook, setShowingBook] = useState([]);
  const [errorSearch, setErrorSearch] = useState(true);
  const [query, setQuery] = useState('');

  const finningBooks = async (query) => {
    setQuery(query);
    setErrorSearch(false);

    if (query.length > 0) {
      const books = await BooksAPI.search(query);

      if (books && !books.error) {
        const mappedbooks = books.map(book => {
          const existingBook = props.books.find(b => b.id === book.id);
          book.shelf = existingBook ? existingBook.shelf : 'none';
          return book;
        });

        setShowingBook(mappedbooks);
      } else {
        setErrorSearch(true);
        setShowingBook([]);
      }
    } else {
      setErrorSearch(true);
      setShowingBook([]);
    }
  };

  return (
    
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/"></Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author"
            onChange={(event) => finningBooks(event.target.value)} value={query} />
        </div>
      </div>

      <div className="search-books-results">
        {showingBook.length > 0 && (
          <div>
            <h3>Search returned {showingBook.length} books</h3>
            <ol className="books-grid">
              {showingBook.map(book => (
                <Book key={book.id} book={book} moveBook={props.moveBook} />
              ))}
            </ol>
          </div>
        )}

        {errorSearch && (
          <div>
            <h3>Please try using search terms.</h3>
            <san>'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball',
              'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie',
              'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development',
              'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy',
              'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer',
              'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn',
              'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting',
              'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River',
              'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale',
              'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
            </san>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
