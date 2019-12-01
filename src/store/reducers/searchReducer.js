import * as actionTypes from '../actions/actions';

export default (state = { searchResults: [] }, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULTS:
            return {
                ...state,
                searchResults: action.payload
            };
        case actionTypes.ERASE_RESULTS:
            return {
                ...state,
                searchResults: action.payload
            };
        case actionTypes.UPDATE_REVIEWS:
            return {
                ...state,
                searchResults: state.searchResults.map(book => {
                    if (book.title === action.payload.title) { 
                        book.reviews = [...action.payload.reviews];
                        return book;
                    } else {
                        return book;
                    }
                })
            }
        default:
            return state;
    }
}