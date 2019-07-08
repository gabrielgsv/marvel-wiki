import superagent from 'superagent'
import paginate from 'paginate-array'

export function paginationHeroes() {
  return function (dispatch, getState) {
    const state = getState()
    dispatch({
      type: 'GET_HEROES',
      payload: {
      ...state,
      loading: true
      }
    })
    const { page, size } = state.PaginationHeroes
    superagent
      .get('https://gateway.marvel.com:443/v1/public/characters')
      .query({
        ts: 1,
        apikey: '1d82a60886ab3933e99bb422ed1946cc',
        hash: '8a9257e658f2d2ccb08f9b271e1f6082',
        orderBy: '-modified',
        offset: 0,
        limit: 100,
      })
      .then(res => {
        console.log(res)
        const result = res.body.data.results
        const curr = paginate(result, page, size)
        dispatch({
          type: 'GET_HEROES',
          payload: {
            ...state,
            heroes: result,
            currPage: curr,
            loading: false
          }
        })
      })
  }
}

export function nextPage() {
  return function (dispatch, getState) {
    const state = getState()
    console.log(state)
    const { currPage, size, heroes } = state.PaginationHeroes
    if (currPage.currentPage < currPage.totalPages) {
      const newPage = currPage.currentPage + 1;
      const newCurrPage = paginate(heroes, newPage, size);
      dispatch({
        type: 'NEXT_PAGE',
        payload: {
          ...state,
          page: newPage,
          currPage: newCurrPage
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
    const { currPage, size, heroes } = state.PaginationHeroes
    if (currPage.currentPage > 1) {
      const newPage = currPage.currentPage - 1;
      const newCurrPage = paginate(heroes, newPage, size);

      dispatch({
        type: 'PREV_PAGE',
				payload: {
          ...state,
          page: newPage,
          currPage: newCurrPage
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
      type: 'GET_HEROES',
      payload: {
        ...state,
        loading: true
      }
    })
    const { page, size } = state.PaginationHeroes
    superagent
      .get('https://gateway.marvel.com:443/v1/public/characters')
      .query({
        ts: 1,
        apikey: '1d82a60886ab3933e99bb422ed1946cc',
        hash: '8a9257e658f2d2ccb08f9b271e1f6082',
        nameStartsWith: value
      })
      .then(res => {
        const result = res.body.data.results
        const curr = paginate(result, page, size)
        dispatch({
          type: 'GET_HEROES',
          payload: {
            ...state,
            heroes: result,
            currPage: curr,
            loading: false
          }
        })
      })
  }
}