import React from 'react'
import { Route } from 'react-router-dom'
import Search from './components/Search'
import BookList from './components/BookList'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  // State has pages
  state = {
    books: [],
    myShelfs: [
      {name: 'Currently Reading', id: 'currentlyReading'},
      {name: 'Want To Read', id: 'wantToRead'},
      {name: 'Read', id: 'read'},
    ],
    pages: {
      root: '/',
      search: '/search'
    }
  }

  componentDidMount () {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      })
    })
  }

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getBooksOnShelf()
    })
  }

  getBooksOnShelf () {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      })
    })
  }

  render () {
    return (
      <div className='app' >
        <Route
          exact
          path={this.state.pages.root}
          render={() =>
            <BookList
              booksOnShelf={this.state.books}
              pages={this.state.pages}
              myShelfs={this.state.myShelfs}
            />
          }
        />

        <Route
          path={this.state.pages.search}
          render={() =>
            <Search
              onShelfChange={this.handleShelfChange}
              pages={this.state.pages}
              booksOnShelf={this.state.books} />}
        />
      </div >
    )
  }
}

export default BooksApp