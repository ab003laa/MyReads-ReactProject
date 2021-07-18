import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

import Book from './Book';


class Search extends Component {
    state = {
      inputStr: '',
      newBooks: [],
      searchErr: false
  };

  updateBooks = e => {
    const inputStr = e.target.value;
    this.setState({ inputStr });

    if (inputStr !== '') {
      BooksAPI.search(inputStr.trim() , 20)
        .then(books => { 
          if(books.length > 0){
            this.setState({ newBooks: books, searchErr: false })
          }
           
        
      });
    }else  this.setState({ newBooks: [], searchErr: true });

    

  };

  render() {
    const { inputStr, newBooks, searchErr } = this.state;
    const { books, changeShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={inputStr}
              onChange={this.updateBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          {newBooks.length > 0 && (
            <div>
              <h3>Search returned {newBooks.length} books </h3>
              <ol className="books-grid">
                {newBooks.map(book => (
                  <Book
                    book={book}
                    books={books}
                    key={book.id}
                    changeShelf={changeShelf}
                  />
                ))}
              </ol>
            </div>
          )}
          {searchErr && (
            <h3>There is nothing matches. Please try again!</h3>
          )}
        </div>
      </div>
    );
  }
}
export default Search;
