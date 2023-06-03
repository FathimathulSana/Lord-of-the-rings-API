import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCharacterDetails } from '../Redux/Actions';

const Details = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const characterDetails = useSelector((state) => state.characterDetails)

    useEffect(() => {
        dispatch(fetchCharacterDetails(id));
    }, [id, dispatch]);
    console.log(characterDetails, "detailsss");
    return (
        <div>  <h1 className="text-center mt-5">The Lord of the Rings API</h1>
            <h4 className="text-center mt-3"> The one API to rule them all</h4>
            <div className='vh-50 d-flex justify-content-center mt-5'>
                <div className="border border-dark w-50 ">
                    <div className='text-center'><h4>Characters</h4></div>
                    <hr style={{ width: "100%", border: "0.1px solid #000000" }} />
                    <div>
                        <Table>
                            {characterDetails.length > 0 && (
                                < tbody >
                                    < tr >
                                        <td>Name</td>
                                        <td>{characterDetails[0].name}</td>
                                    </tr>
                                    <tr>
                                        <td>WikiURL</td>
                                        <td><a> {characterDetails[0].wikiUrl}</a> </td>
                                    </tr>
                                    <tr>
                                        <td>Race</td>
                                        <td>race</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>race</td>
                                    </tr>
                                    <tr>
                                        <td>Height</td>
                                        <td>race</td>
                                    </tr>
                                    <tr>
                                        <td>Hair</td>
                                        <td>race</td>
                                    </tr>
                                    <tr>
                                        <td>Realm</td>
                                        <td>race</td>
                                    </tr>
                                    <tr>
                                        <td>Birth</td>
                                        <td>race</td>
                                    </tr>
                                    <tr>
                                        <td>Spouse</td>
                                        <td>race</td>
                                    </tr>
                                    <tr>
                                        <td>Death</td>
                                        <td>race</td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Details