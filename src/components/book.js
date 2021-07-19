import React from 'react';
import propTypes from 'prop-types'


const Book =(props)=>{
    const {book  }= props;
    const change = props.moveBook;


    let title = book.title ? book.title : 'No title available';
    let imageCover = book.imageLinks && book.imageLinks.thumbnail? book.imageLinks.thumbnail: "noCover";
    //let authors = book.authors ? book.authors.map(author => author ):
    let authors ="Author is Unknown"
    try{
        if(book.authors){
            authors= book.authors.reduce((accumalator, item)=>{
                accumalator += item +", "
                return accumalator
            },"")
            authors= authors.slice(0,authors.length-1)
        }
    }
    catch (err){}

    const onchange= (e) =>{
        change( book , e.target.value)
            
    }



    return(
        <li>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${imageCover}")` }}></div>
                <div className="book-shelf-changer">
                    <select defaultValue={book.shelf ? book.shelf: "none"} onChange={onchange} >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        </li>
    )
}

Book.propTypes={
    book : propTypes.array.isRequired,
    moveBook : propTypes.func.isRequired
}

export default Book;