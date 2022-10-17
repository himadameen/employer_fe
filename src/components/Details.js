import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../App.css';

const Details = () => {

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const [dark, setDark] = useState('');

    const [details, setDetails] = useState([]);
    const [search, setSearch] = useState('');
    const itemsPerPage = 8;
    const navigate = useNavigate();

    const callapi = async () => {
        const url = "http://localhost:2000/";
        const response = await axios.get(url);
        setDetails(response.data);
    }

    useEffect(() => {
        callapi();
    }, [])

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(details.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(details.length / itemsPerPage));
    }, [details, itemOffset, itemsPerPage]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % details.length;
        setItemOffset(newOffset);
    };

    const handleUpdate = (_id) => {
        navigate('/update/' + _id);
    }

    const handleDelete = async (username) => {
        console.log(username);
        const url = `http://localhost:2000/${username}`;
        const response = await axios.delete(url);
        var del = prompt("Are you sure you want to delete", "Yes");
        if (del === "Yes") {
            callapi();
        }
    }

    return (
        <>
            {currentItems.length > 0 ? (
                <div className='detail'>
                    <div className='tog'>
                        <b>Light Mode</b>
                        <div className="form-check form-switch swi">
                            <input className="form-check-input" type="checkbox" onClick={() => {
                                if (dark === 'table-dark table-striped') setDark('');
                                else setDark('table-dark table-striped')
                            }} />
                        </div>
                        <b>Dark Mode</b>
                    </div>
                    <div id='head'>
                        <h2>Employer <span>&nbsp; Details</span></h2>
                        <input type="search" placeholder='Select by email or username' onChange={handleChange} />
                    </div>
                    <>
                        {currentItems.length > 0 ? (
                            <div className="contain">
                                <table className={`table table-success table-striped ${dark}`}>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope='col'>Profile</th>
                                            <th scope="col">UserName</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Contact Number</th>
                                            <th scope="col">Gender</th>
                                            <th scope='col'></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems && currentItems.filter(item => {
                                            const searchTerm = search.toLowerCase();
                                            const getDetail = item.username || item.email;
                                            return getDetail.startsWith(searchTerm);
                                        })
                                            .map((item, index) => (
                                                <tr key={item.phone}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>
                                                        <img src={item.profile} alt='profilePic' />
                                                    </td>
                                                    <td>{item.username}</td>
                                                    <td>{item.email}</td>
                                                    {item.status === 'active' ? (
                                                        <td className='green'>{item.status}</td>
                                                    ) : (
                                                        <td className='red'>{item.status}</td>
                                                    )}

                                                    <td>{item.phone}</td>
                                                    {item.gender === 'male' ? (
                                                        <td>
                                                            <img id="gender" src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7800766/businessman-clipart-md.png" alt="male" />
                                                            &nbsp;&nbsp;{item.gender}
                                                        </td>
                                                    ) : (
                                                        <td>
                                                            <img src="https://image.pngaaa.com/336/4762336-small.png" alt='female' />
                                                            &nbsp;&nbsp;{item.gender}
                                                        </td>
                                                    )}

                                                    <td id='icons'>
                                                        <Link to='/add'><i class="fa fa-plus-circle" ></i></Link>
                                                        <i className="fa fa-pencil" onClick={() => handleUpdate(item._id)}></i>
                                                        <i className="fa fa-trash" onClick={() => handleDelete(item.username)}></i>
                                                    </td>
                                                </tr>
                                            ))}

                                    </tbody>
                                </table>
                                <div className='add'>
                                    <div id='add'>
                                        <Link to='/add'><i className="fa fa-plus-circle" >&nbsp; ADD</i></Link>
                                    </div>


                                    <ReactPaginate
                                        nextLabel=">>"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        pageCount={pageCount}
                                        previousLabel="<<"
                                        renderOnZeroPageCount={null}
                                        containerClassName="pagination"
                                        pageLinkClassName='page-num'
                                        previousLinkClassName='page-num'
                                        activeLinkClassName='active'
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="container">
                                <h4>Their is no such Employee in this table 😏😏</h4>
                            </div>
                        )
                        }
                    </>
                </div>
            ) : (
                <div className="container-fluid">
                    <img src='https://c.tenor.com/6gHLhmwO87sAAAAi/gg.gif' alt='gif' id='gif' />
                </div>
            )
            }
        </>
    )
}

export default Details;