import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import MainPage from './components/mainPage'
import Search from './components/search'
import _ from 'lodash'
import './App.css'

class BooksApp extends React.Component {

  constructor (props) {
    super(props)
    this.changeShelf = this.changeShelf.bind(this)
  }

  // State has pages
  state = {
    myBooks: [],
    myShelf: [
      { name: 'Currently Reading', id: 'currentlyReading', empty: false, books: [] },
      { name: 'Want to Read', id: 'wantToRead', empty: false, books: [] },
      { name: 'Read', id: 'read', empty: false, books: [] }
    ],
    pages: {
      root: '/',
      search: '/search'
    }
  }

  componentDidMount () {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({ myBooks })
    })
  }

  changeShelf (event, book) {
    book.shelf = event.target.value
    const myBooks = this.state.myBooks

    myBooks.map((myBook) => {
      if (book.title === myBook.title) {
        this.setState({
          myBook: book
        })
      }
    })
  }

  render () {
    return (
      <div className='app' >
        <Route
          exact
          path={this.state.pages.search}
          render={() => (
            <Search
              pages={this.state.pages}
              myBooks={this.state.myBooks}
            />
          )}
        />

        <Route
          exact
          path={this.state.pages.root}
          render={() => (
            <MainPage
              onChangeShelf={this.changeShelf}
              data={this.state}
            />
          )}
        />
      </div >
    )
  }
}

export default BooksApp
