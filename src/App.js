import React from 'react'
import { Route } from 'react-router-dom'
import SearchPage from './components/SearchPage'
import MainPage from './components/MainPage' 
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      //Route components to main and search page
      <div>
        <Route exact path="/" component={ MainPage }/>
        <Route exact path="/search" component={ SearchPage }/>
      </div>
    );
  }
}

export default BooksApp

