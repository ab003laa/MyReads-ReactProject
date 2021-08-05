import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import Book from './book';
import propTypes from 'prop-types'



class Search extends Component {
   state={
     showingBook:[],
     errorSeach:true,
     query:''
  }
  
/*
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
*/
finningBooks = async (query) =>  {
  this.setState({ query , errorSeach:false});
  if (query.length> 0 ) {
    
    const books = await BooksAPI.search(query)
    if(books.length > 0) {
      const mappedbooks = books.map(book => {
        if (this.props.books.some(b => b.id === book.id)) {
          book.shelf = this.props.books.find(b => b.id === book.id).shelf
          }
        else book.shelf = 'none'

        return book;

      })
      this.setState({showingBook: mappedbooks})
    }else this.setState({errorSeach : true , showingBook: [] })
    
    
  }else this.setState({errorSeach : true , showingBook: [] })
}





    render() { 
        return ( 
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/"></Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                onChange={(event)=>this.finningBooks(event.target.value)} value={this.state.query} />
              </div>
            </div>

            <div className="search-books-results">
              {this.state.showingBook.length > 0 &&(
                <div> 
                <h3>Search returned {this.state.showingBook.length} books </h3>
                  <ol className="books-grid"> 
                  {this.state.showingBook.map(book => (
                      <Book key={book.id} book={book} moveBook={this.props.moveBook}/>
                    ))}</ol>
                </div>
              )}
              
            {this.state.errorSeach && (
            <div>
            <h3>Search did not return any books. Please try using search terms</h3>
            <p>'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 
              'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 
              'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 
              'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 
              'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 
              'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 
              'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 
              'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 
              'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 
              'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
            </p>
            </div>
          )}
          </div>
            
        </div>
             
        )
    }
}
Search.propTypes = {
    moveBook : propTypes.func.isRequired,
    books : propTypes.array.isRequired
}
export default Search;