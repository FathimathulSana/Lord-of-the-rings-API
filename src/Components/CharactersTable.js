import React, { useEffect } from "react";
import { Button, Container, Form, Pagination, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters, setCurrentPage, setPerPage, setSearch, setSearchResults, setSelectedGender, setSelectedRaces, setSortOrder } from '../Redux/Actions';

const CharactersTable = () => {
    const dispatch = useDispatch();
    const characters = useSelector((state) => state.characters)
    const search = useSelector((state) => state.search);
    const searchResults = useSelector((state) => state.searchResults)
    const selectedRaces = useSelector((state) => state.selectedRaces)
    const selectedGender = useSelector((state) => state.selectedGender)
    const sortOrder = useSelector((state) => state.sortOrder)
    const perPage = useSelector((state) => state.perPage);
    const currentPage = useSelector((state) => state.currentPage);
    const totalPages = useSelector((state) => state.totalPages);

    useEffect(() => {
        dispatch(fetchCharacters());
    }, [dispatch, search, selectedRaces, selectedGender, sortOrder, perPage, currentPage]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        dispatch(setSearch(searchTerm));
    }
    const handleRaceChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        dispatch(setSelectedRaces(selectedOptions));
    }
    const handleGenderChange = (event) => {
        dispatch(setSelectedGender(event.target.value));
    }
    const handleSortOrderChange = (event) => {
        dispatch(setSortOrder(event.target.value));
    };
    const handlePerPageChange = (event) => {
        dispatch(setPerPage(Number(event.target.value)));
        dispatch(setCurrentPage(1));
    }
    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    }

    const handleSearchClick = () => {
        const searchResults = characters.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()));
        dispatch(setSearchResults(searchResults));
    }
    const renderPageNumbers = () => {
        const pageItems = [];
        for (let i = 1; i <= totalPages; i++) {
            pageItems.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Pagination.Item>

            );
        }
        return pageItems;
    }

    let rowIndex = 0;

    return (
        <div>
            < Container className="mb-5" >
                <h1 className="text-center mt-5">The Lord of the Rings API</h1>
                <h4 className="text-center mt-3"> The one API to rule them all</h4>
                <Form>
                    <Form.Group controlId="search">
                        <Form.Label>Search by name:</Form.Label>
                        <div className="d-flex">
                            <Form.Control type='text' value={search} onChange={handleSearch} />
                            <Button variant="secondary" onClick={handleSearchClick}>Search</Button>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="raceFilter">
                        <Form.Label>Filter by race:</Form.Label>
                        <Form.Control as='select' value={selectedRaces} onChange={handleRaceChange}>
                            <option value="Human">Human</option>
                            <option value="Elf">Elf</option>
                            <option value="Dwarf">Dwarf</option>
                            <option value="Hobbit">Hobbit</option>
                            <option value="Ent">Ent</option>
                            <option value="Orc">Orc</option>
                            <option value="Maiar">Maiar</option>
                            <option value="Ainur">Ainur</option>
                            <option value="Balrog">Balrog</option>
                            <option value="Valar">Valar</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="genderFilter">
                        <Form.Label>Filter by gender:</Form.Label>
                        <Form.Control as='select' value={selectedGender} onChange={handleGenderChange} >
                            <option value="">Any</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="sortOrder">
                        <Form.Label>Sort by name:</Form.Label>
                        <Form.Control as='select' value={sortOrder} onChange={handleSortOrderChange}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Discending</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Race</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(searchResults.length > 0 ? searchResults : characters).map((character) => (
                            < tr key={character._id} >
                                <td>{++rowIndex}</td>
                                <td>{character.name}</td>
                                <td>{character.race}</td>
                                <td>{character.gender}</td>
                                <td> <a href={`/details/${character._id}`} style={{ textDecoration: " none", color: "inherit" }}>
                                    Details
                                </a></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between">
                    <div> <Pagination >
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    </Pagination>
                    </div>
                    <div >
                        <Form.Group className="d-flex align-items-center justify-content-center" controlId="perPage">
                            <Form.Label className="mt-2 me-2">Limit:</Form.Label>
                            <Form.Control as='select' value={perPage} onChange={handlePerPageChange}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">50</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                </div >
            </Container >
        </div >
    );
}

export default CharactersTable