import {combineReducers} from 'redux'
import paginationHeroes from './pagination_heroes'
import paginationComics from './pagination_comics'

const reducers = combineReducers({
  PaginationHeroes: paginationHeroes,
  PaginationComics: paginationComics,
})

export default reducers