import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom';
import './App.css'
import BookList from './components/BookList';
import Search from './components/Search';

class BooksApp extends React.Component {
  state = {
    books: [],
    
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = async () => {
    this.setState(() => ({ showSearchPage: true }));
    try {
      const response = await BooksAPI.getAll();
      this.setState(() => ({
        books: response,
        showSearchPage: false,
      }));
    } catch (error) {
      this.setState(() => ({ showSearchPage: false }));
      throw new Error(error);
    }
  };

  
  

  changeShelf = (changedBook, shelf) => {
    BooksAPI.update(changedBook, shelf).then(response => {
      changedBook.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books
          .filter(book => book.id !== changedBook.id)
          .concat(changedBook)
      }));
    });
  };

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route 
              path="/search" 
              render={() => (
              <Search books={books} changeShelf={this.changeShelf} />
              )}/>
        <Route
              exact
              path="/"
              render={() => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <BookList books={books} changeShelf={this.changeShelf} />
                  <div className="open-search">
                    <Link to="/search">Search</Link>
                  </div>
                </div>
              )}
            />
          </div> 
    )
  }
}

export default BooksApp
