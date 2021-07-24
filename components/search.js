import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import Book from './book';
import propTypes from 'prop-types'



class Search extends Component {
   state={
     showingBook:[]    
  }

  findingBooks = async (query) => {
    const books = await BooksAPI.search(query)
    let bookshelf = !books.error && books ? books.map(book => {
      if (this.props.books.some(b => b.id === book.id)) {
        book.shelf = this.props.books.find(b => b.id === book.id).shelf
      }
      return book;
    }) : []
    this.setState({showingBook: bookshelf})
  
}




    render() { 
        return ( 
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/"></Link>
              <div className="search-books-input-wrapper">
                
                <input type="text" placeholder="Search by title or author"
                
                onChange={(event)=>this.findingBooks(event.target.value)} />

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