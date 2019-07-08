import superagent from 'superagent'
import paginate from 'paginate-array'

export function paginationComics() {
  return function (dispatch, getState) {
    const state = getState()
    dispatch({
      type: 'GET_COMICS',
      payload: {
        ...state,
        loading: true
      }
    })
    const { page, size } = state.PaginationComics
    superagent
      .get('https://gateway.marvel.com:443/v1/public/comics')
      .query({
        ts: 1,
        apikey: '1d82a60886ab3933e99bb422ed1946cc',
        hash: '8a9257e658f2d2ccb08f9b271e1f6082',
        orderBy: '-modified',
        offset: 0,
        limit: 100,
      })
      .then(res => {
        const result = res.body.data.results
        const curr = paginate(result, page, size)
        dispatch({
          type: 'GET_COMICS',
          payload: {
            comics: result,
            currPage: curr,
            loading: false
          }
        })
      })
      .catch((err) => {
        throw err
      })
  }
}

export function nextPage() {
  return function (dispatch, getState) {
    const state = getState()
    console.log(state)
    const { currPage, size, comics } = state.PaginationComics
    if (currPage.currentPage < currPage.totalPages) {
      const newPage = currPage.currentPage + 1;
      const newCurrPage = paginate(comics, newPage, size);
      dispatch({
        type: 'NEXT_PAGE',
        payload: {
          page: newPage,
          currPage: newCurrPage,
          loading: false
        }
      });
    } else {
      return
    }
  }
}

export function previusPage() {
  return function (dispatch, getState) {
    const state = getState();
    const { currPage, size, comics } = state.PaginationComics
    if (currPage.currentPage > 1) {
      const newPage = currPage.currentPage - 1;
      const newCurrPage = paginate(comics, newPage, size);

      dispatch({
        type: 'PREV_PAGE',
				payload: {
          page: newPage,
          currPage: newCurrPage,
          loading: false
        }
      })
    } else {
      return
    }
  }
}

export function paginationSearch(value) {
  return function (dispatch, getState) {
    const state = getState()
      dispatch({
        type: 'GET_COMICS',
        payload: {
          ...state,
          loading: true
        }
      })
    const { page, size } = state.PaginationComics
    superagent
      .get('https://gateway.marvel.com:443/v1/public/comics')
      .query({
        ts: 1,
        apikey: '1d82a60886ab3933e99bb422ed1946cc',
        hash: '8a9257e658f2d2ccb08f9b271e1f6082',
        titleStartsWith: value
      })
      .then(res => {
        const result = res.body.data.results
        const curr = paginate(result, page, size)
        dispatch({
          type: 'GET_COMICS',
          payload: {
            comics: result,
            currPage: curr,
            loading: false
          }
        })
      })
  }
}