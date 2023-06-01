import React, { useEffect } from "react";
import { Container, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters, setCurrentPage, setPerPage, setSearch, setSelectedGender, setSelectedRaces, setSortOrder } from "./Redux/Actions";
function App() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters)
  const search = useSelector((state) => state.search);
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
    dispatch(setSearch(event.target.value));
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
  const handlePageChange = (event) => {
    dispatch(setCurrentPage(Number(event.target.value)));
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
            <Form.Control type='text' value={search} onChange={handleSearch} />
          </Form.Group>
          <Form.Group controlId="raceFilter">
            <Form.Label>Filter by race:</Form.Label>
            <Form.Control as='select' multiple value={selectedRaces} onChange={handleRaceChange}>
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
            {characters.map((character) => (
              < tr key={character._id} >
                <td>{++rowIndex}</td>
                <td>{character.name}</td>
                <td>{character.race}</td>
                <td>{character.gender}</td>
                <td>Details</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Form.Group controlId="perPage">
          <Form.Label>Limit:</Form.Label>
          <Form.Control style={{ width: '4%' }} as='select' value={perPage} onChange={handlePerPageChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">50</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="currentPage">
          <Form.Label>Current Page:</Form.Label>
          <Form.Control type='number' min='1' max={totalPages} value={currentPage} onChange={handlePageChange}>
          </Form.Control>
        </Form.Group>
      </Container >
    </div >
  );
}

export default App;
