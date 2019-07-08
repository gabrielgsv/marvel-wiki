const paginationHeroes = (state = {
  heroes: [],
  size: 10,
  page: 1,
  currPage: null,
  loading: false,
}, action) => {
  switch (action.type) {
    case 'GET_HEROES':
      state = {
        ...state,
        heroes: action.payload.heroes,
        currPage: action.payload.currPage,
        loading: action.payload.loading
      }
    case 'NEXT_PAGE':
      state = {
        ...state,
        page: action.payload.page,
        currPage: action.payload.currPage,
      }
    case 'PREV_PAGE':
      state = {
        ...state,
        page: action.payload.page,
        currPage: action.payload.currPage,
      }
    default:
      return state
  }
}

export default paginationHeroes