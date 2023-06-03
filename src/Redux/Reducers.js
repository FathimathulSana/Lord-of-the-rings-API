const initialState = {
    search: '',
    searchResults: [],
    selectedRaces: [],
    selectedGender: '',
    sortOrder: 'asc',
    perPage: 10,
    currentPage: 1,
    totalPages: 0,
    characters: [],
    characterDetails: []
}
const Reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return { ...state, search: action.payload };
        case 'SET_SEARCH_RESULTS':
            return { ...state, searchResults: action.payload };
        case 'SET_SELECTED_RACES':
            return { ...state, selectedRaces: action.payload };
        case 'SET_SELECTED_GENDER':
            return { ...state, selectedGender: action.payload };
        case 'SET_SORT_ORDER':
            return { ...state, sortOrder: action.payload };
        case 'SET_PER_PAGE':
            return { ...state, perPage: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_TOTAL_PAGES':
            return { ...state, totalPages: action.payload };
        case 'SET_CHARACTERS':
            return { ...state, characters: action.payload };
        case 'SET_CHARACTER_DETAILS':
            return { ...state, characterDetails: action.payload }
        default:
            return state;
    }
};

export default Reducers