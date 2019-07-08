const paginationComics = (state = {
  comics: [],
  size: 10,
  page: 1,
  currPage: null
}, action) => {
  switch (action.type) {
    case 'GET_COMICS':
      state = {
        ...state,
        comics: action.payload.comics,
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

export default paginationComics