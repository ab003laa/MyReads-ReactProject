import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import Book from './book';
import propTypes from 'prop-types'



class Search extends Component {
   state={
     showingBook:[]    
  }
  



  newBooks = event => {
    const query = event.target.value;
    this.setState({ query });

    if (query) {
      BooksAPI.search(query.trim(), 20).then(books => {
        books.length > 0
          ? this.setState({ showingBook : books})
          : this.setState({ showingBook : [] });
      });

    } else this.setState({ showingBook: []});
  };


    render() { 
        return ( 
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/"></Link>
              <div className="search-books-input-wrapper">
                
                <input type="text" placeholder="Search by title or author"
                
                onChange={this.newBooks} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"> {this.state.showingBook.map(book => (
                  <Book key={book.id} book={book} moveBook={this.props.moveBook}/>
                ))}</ol>
            </div>
            
          </div>
             
         );
    }
}
Search.propTypes = {

    moveBook : propTypes.func.isRequired
}
export default Search;