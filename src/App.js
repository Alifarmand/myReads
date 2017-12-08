import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import MainPage from './components/mainPage'
import Search from './components/search'
import './App.css'

class BooksApp extends React.Component {

  state = {
    myBooks: [],
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
          path='/search'
          component={Search}
        />

        <Route
          exact
          path='/'
          render={() => (
            <MainPage
              myBooks={this.state.myBooks}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
