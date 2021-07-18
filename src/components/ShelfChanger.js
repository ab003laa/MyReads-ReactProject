import React from 'react';
import '../App.css'


function ShelfChanger(props) {

  const updateShelf = data =>
    props.changeShelf(props.book, data.target.value);

    const { book, books } = props;

    let shelfNow = '';
    
    
    for (let item of books) {
      if (item.id === book.id) {
        shelfNow = item.shelf;
        break;
      }
      shelfNow = 'none'
    }


    return (

      <div className="book-shelf-changer">
        <select onChange={updateShelf} defaultValue={shelfNow}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none"  >None</option>
        </select>
      </div>
    );
  
}


export default ShelfChanger;
