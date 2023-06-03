import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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
                    <div className='text-center mt-2'><h4>{`Characters > ${characterDetails[0]?.name}`}</h4></div>
                    < hr style={{ width: "100%", border: "0.1px solid #000000" }} />
                    <div>
                        <Table>
                            {characterDetails.length > 0 && (
                                < tbody >
                                    < tr >
                                        <td>Name</td>
                                        <td>{characterDetails[0].name ? characterDetails[0].name : "__"}</td>
                                    </tr>
                                    <tr>
                                        <td>WikiURL</td>
                                        <td><a href={characterDetails[0].wikiUrl} className='text-dark' >{characterDetails[0].wikiUrl ? characterDetails[0].wikiUrl : "__"}</a></td>
                                    </tr>
                                    <tr>
                                        <td>Race</td>
                                        <td>{characterDetails[0].race ? characterDetails[0].race : "__"}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>{characterDetails[0].gender ? characterDetails[0].gender : "__"}</td>
                                    </tr>
                                    <tr>
                                        <td>Height</td>
                                        <td>{characterDetails[0].height ? characterDetails[0].height : "__"}</td>
                                    </tr>
                                    <tr>
                                        <td>Hair</td>
                                        <td>{characterDetails[0].hair ? characterDetails[0].hair : "__"}</td>
                                    </tr>
                                    <tr>
                                        <td>Realm</td>
                                        <td>{characterDetails[0].realm ? characterDetails[0].realm : "__"}</td>
                                    </tr>
                                    <tr>
                                        <td>Birth</td>
                                        <td>{characterDetails[0].birth ? characterDetails[0].birth : "__"}</td>
                                    </tr>
                                    <tr>
                                        <td>Spouse</td>
                                        <td>{characterDetails[0].spouse ? characterDetails[0].spouse : "__"}</td>
                                    </tr>
                                    <tr>
                                        <td>Death</td>
                                        <td>{characterDetails[0].death ? characterDetails[0].death : "__"}</td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                        <div className='d-flex align-items-end justify-content-end'><Link to='/'> <Button className='m-3' variant="outline-secondary" size='lg'>Close</Button></Link></div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Details