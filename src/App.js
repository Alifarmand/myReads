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
    }
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
              pages={this.state.pages}
            />
          )}
        />

        <Route
          exact
          path={this.state.pages.root}
          render={() => (
            <MainPage
              data={this.state}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
