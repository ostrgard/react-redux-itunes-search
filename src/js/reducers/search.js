import $ from 'jquery';

const SEARCH = 'search/SEARCH';
const SEARCH_SUCCESS = 'search/SEARCH_SUCCESS';
const SEARCH_FAIL = 'search/SEARCH_FAIL';

const initialState = {
  status: 'init',
  term: '',
  error: undefined,
  result: []
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        status: action.term === '' ? 'init' : 'searching',
        term: action.term,
        error: undefined
      };
    case SEARCH_SUCCESS: {
      return {
        ...state,
        status: action.result && action.result.length > 0 ? 'success' : 'fail',
        term: action.term,
        result: action.result
      };
    }
    case SEARCH_FAIL: {
      return {
        ...state,
        status: 'fail',
        error: action.error,
        result: []
      };
    }
    default:
      return state;
  }
}

export function searchStart(term) {
  return {
    type: SEARCH,
    term: term
  };
}

export function searchSuccess(term, result) {
  return {
    type: SEARCH_SUCCESS,
    term: term,
    result: result
  };
}

export function searchFail(term, error) {
  return {
    type: SEARCH_FAIL,
    term: term,
    error: error
  };
}

function fetchFromItunes(query) {
  return $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'https://itunes.apple.com/search?term=' + encodeURI(query)
  });
}

let debounce;

export function searchAction(term) {
  return function (dispatch, getState) {
    dispatch(searchStart(term));
    clearTimeout(debounce);
    if (term !== '') {
      debounce = setTimeout(() => {
        fetchFromItunes(term).then(
          (result) => getState().search.term === term && dispatch(searchSuccess(term, result.results)),
          (error) => getState().search.term === term && dispatch(searchFail(term, error))
        );
      }, 500);
    }
  };

}