import axios from "axios";

const KEY = '_R_vmyXDpG1bUZRmjaFI';

export const setSearch = (search) => ({
    type: 'SET_SEARCH_TERM',
    payload: search
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

export const setCurrentPage = (currentPage) => ({
    type: 'SET_CURRENT_PAGE',
    payload: currentPage
})
export const setTotalPages = (totalPages) => ({
    type: 'SET_TOTAL_PAGES',
    payload: totalPages
})
export const setCharacters = (characters) => ({
    type: 'SET_CHARACTERS',
    payload: characters
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
                    Authorization: `Bearer ${KEY}`,
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
