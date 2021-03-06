import React from 'react';
import Book from './book';
import propTypes from 'prop-types'


const Bookshelf=(props)=>{


  const shelfTypes = {
     'currentlyReading' : 'Currently Reading' ,
     'wantToRead' : 'Want to Read' ,
     'read' : 'Read' 
};




  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTypes[props.shelf]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(b=> <Book key={b.id}  book={b} moveBook={props.moveBook}/>)}
                
        </ol>
      </div>
      </div>
  )
}
Bookshelf.propTypes={
  shelf : propTypes.string.isRequired,
  moveBook : propTypes.func.isRequired,
  books : propTypes.array.isRequired,
  

}
export default Bookshelf;



