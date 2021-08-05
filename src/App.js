import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import Home from './components/home'
import Search from './components/search'


class BooksApp extends React.Component {
  state = { books: []};

  getBooks= async ()=>{
     const books =await BooksAPI.getAll()
     this.setState({ books });
 }
componentDidMount() {
  this.getBooks()

}

moveBook = async (book,shelf)=>{

  await BooksAPI.update(book, shelf).then(resp=>{
    var found = false;
    for (let i = 0; i < this.state.books.length; i++) {
      if (this.state.books[i].id === book.id) {
        this.state.books[i].shelf = shelf;
        found = true;
        break;
      }
    }
    if (found) {
      this.setState({
        books: this.state.books.map(Book => {
          if (Book.id === book.id) {
            Book.shelf = shelf;
          }
          return Book;
      })

    })
    }
    else{
      book.shelf = shelf;
      this.setState({
        books: this.state.books.concat(book)
      })
    }
  })
}


  render() {
    return (
      <div className="app">

        <Route exact path="/" render={()=>(
          <Home moveBook={this.moveBook} books={this.state.books}/>
            )} >

        </Route>

        <Route path="/search" render={()=>(
        <Search books={this.state.books} moveBook={this.moveBook}/>
            )}>

        </Route>
          
      </div>
      
     
    )
  }
}
  


export default BooksApp
