import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import MainPage from './components/mainPage'
import Search from './components/search'
import './App.css'

class BooksApp extends React.Component {

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
          render={( {history} ) => (
            <MainPage/>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
