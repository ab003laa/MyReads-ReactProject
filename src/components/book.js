import React from 'react';

const Book = ({ book, moveBook }) => {
  const { title, imageLinks, authors, shelf } = book;

  const handleChange = (e) => {
    moveBook(book, e.target.value);
  };

  const imageCover = imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : "noCover";
  const authorsText = authors ? authors.join(', ') : 'Author is Unknown';

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${imageCover}")` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf ? shelf : 'none'} onChange={handleChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authorsText}</div>
      </div>
    </li>
  );
};

export default Book;
