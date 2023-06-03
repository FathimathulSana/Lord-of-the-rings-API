import axios from "axios";

const apiKey = process.env.REACT_APP_MY_KEY;

export const setSearch = (searchTerm) => ({
    type: 'SET_SEARCH_TERM',
    payload: searchTerm
});

export const setSelectedRaces = (selectedRaces) => ({
    type: 'SET_SELECTED_RACES',
    payload: selectedRaces
})

export const setSelectedGender = (selectedGender) => ({
    type: 'SET_SELECTED_GENDER',
    payload: selectedGender
})

export const setSortOrder = (sortOrder) => ({
    type: 'SET_SORT_ORDER',
    payload: sortOrder
})

export const setPerPage = (perPage) => ({
    type: 'SET_PER_PAGE',
    payload: perPage
})

export const setCurrentPage = (page) => ({
    type: 'SET_CURRENT_PAGE',
    payload: page
})
export const setTotalPages = (totalPages) => ({
    type: 'SET_TOTAL_PAGES',
    payload: totalPages
})
export const setCharacters = (characters) => ({
    type: 'SET_CHARACTERS',
    payload: characters
})
export const setCharacterDetails = (details) => ({
    type: 'SET_CHARACTER_DETAILS',
    payload: details
})

export const fetchCharacters = () => {
    return async (dispatch, getState) => {
        const state = getState();
        const params = {
            limit: state.perPage,
            page: state.currentPage,
            sort: state.sortOrder === 'asc' ? 'name' : '-name',
            race: state.selectedRaces.join(','),
            gender: state.selectedGender,
            name: state.search
        };
        try {
            const response = await axios.get('https://the-one-api.dev/v2/character', {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    Accept: 'application/json',
                },
                params: params
            });
            dispatch(setCharacters(response.data.docs));
            dispatch(setTotalPages(response.data.totalPages));
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    }
}
export const fetchCharacterDetails = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://the-one-api.dev/v2/character/${id}`, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    Accept: 'application/json',
                }
            });
            const characterDetails = response.data.docs;
            dispatch(setCharacterDetails(characterDetails));
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    }
}