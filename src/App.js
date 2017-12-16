import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import MainPage from './components/mainPage'
import Search from './components/search'
import './App.css'

class BooksApp extends React.Component {

  //State has pages
  state = {
    myBooks: [],
    pages: {
      root: '/',
      search: '/search'
    },
    test: 'Let us see if it works'
  }

  componentDidMount() {
    BooksAPI.getAll().then((myBooks) => {
        this.setState({myBooks})
    })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path={this.state.pages.search}
          render={() => (
            <Search
              page={this.state.pages}
            />
          )}
        />

        <Route
          exact
          path={this.state.pages.root}
          render={() => (
            <MainPage
              page={this.state.pages}
              myBooks={this.state.myBooks}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
