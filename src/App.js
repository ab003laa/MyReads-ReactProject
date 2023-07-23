import React, { useState, useEffect } from 'react';
import {  Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Search from './components/search';
import * as BooksAPI from './BooksAPI';
import Header from "./components/header"

const BooksApp = () => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const books = await BooksAPI.getAll();
    setBooks(books);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const moveBook = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);
      setBooks((prevBooks) => {
        const updatedBooks = prevBooks.map((b) => {
          if (b.id === book.id) {
            return { ...b, shelf };
          }
          return b;
        });
        if (!updatedBooks.some((b) => b.id === book.id)) {
          book.shelf = shelf;
          return [...updatedBooks, book];
        }
        return updatedBooks;
      });
    } catch (error) {
      console.error('Error moving book:', error);
    }
  };

  return (
    <div>
    <Header/>
    <div className="app">
    <Routes>
          <Route exact  path="/" element={
            <div>
              <Home moveBook={moveBook} books={books} />
              <div className="open-search">
                <Link to="/search">Add Book</Link>
              </div>
            </div>
          } />
          <Route path="/search" element={<Search moveBook={moveBook} books={books} />} />
        
          </Routes>

    </div>
    </div>
  );
};

export default BooksApp;
