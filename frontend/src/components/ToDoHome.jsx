import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button, Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ToDoAdd from './ToDoAdd'
import Swal from 'sweetalert2'

const ToDoHome = () => {


    const [data, setData] = useState([]);
    const [updation, setUpdation] = useState(false);
    const [singleval, setSingleval] = useState([]);
    const [loading, setLoading] = useState(true);

    //for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;//Number of item per page



    //to get Learners data from database
    const fetchDatafromAPI = (pageNumber) => {
        return axios
            .get(`http://localhost:5000/api/getdata/`)
            .then((response) => {
                //console.log("Data from get"+response.data);

                const resData = response.data.data;
                const startIndex = (pageNumber - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const paginatedData = resData.slice(startIndex, endIndex);
                setData(paginatedData);
                setTotalPages(Math.ceil(resData.length / pageSize));


            })
            .catch((err) => console.log(err));
    };
    //To update todo
    const updateToDO = (val) => {
        setUpdation(true);
        setSingleval(val);
    };

    //to delete todo data
    const deleteToDo = (id) => {

        axios
            .delete(`http://localhost:5000/api/deldata/${id}`, data)
            .then((response) => {
                if (response.data.message === 'Deleted successfully') {
                    //fetchDatafromAPI(currentPage);
                    window.location.reload(true);
                    Swal.fire('', response.data.message, 'success');
                } else {
                    Swal.fire('Sorry', response.data.message, '');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchDatafromAPI(currentPage)
            .then(() => setLoading(false)) // Set loading to false after the API call finishes
            .catch((error) => console.log(error)); // Handle any errors during the API call
    }, [currentPage]);

    useEffect(() => {
        fetchDatafromAPI(currentPage);
    }, [currentPage]);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }


    let finalJSX =
        <div className="container w-75 mt-4 pt-4">
            {/* Button to add ToDo data using form */}
            <Link to="/todoadd">
                <Button variant="success" className="mb-3">
                    <ion-icon name="person-add-outline" size="large"></ion-icon>
                </Button>
            </Link>
            &nbsp;&nbsp;&nbsp;

            {/* to display to do data in a table */}
            {loading ?
                (<p>Loading data..</p>
                ) :
                data && data.length > 0 ? ( // Check if data is not undefined and has some elements
                    <>
                        <Table responsive bordered hover>
                            <thead>
                                <tr class="table-success">

                                    <th>Event Name</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((value, index) => (
                                    <tr key={index} className={value.status === 'COMPLETED' ? 'completed-task' : ''}>

                                        <td className={value.status === 'COMPLETED' ? 'completed-task' : ''}>{value.eventname}</td>
                                        <td className={value.status === 'COMPLETED' ? 'completed-task' : ''}>{value.status}</td>

                                        <td>
                                            <Button variant="success" onClick={() => updateToDO(value)}>
                                                <ion-icon name="create"></ion-icon>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => deleteToDo(value._id)}>
                                                <ion-icon name="close-circle"></ion-icon>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className='d-flex justify-content-center'>
                            <Pagination>
                                <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1} />
                                {[...Array(totalPages).keys()].map((pageNumber) => (
                                    <Pagination.Item
                                        key={pageNumber}
                                        active={pageNumber + 1 === currentPage}
                                        onClick={() => handlePagination(pageNumber + 1)}
                                    >
                                        {pageNumber + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
                            </Pagination>

                        </div>

                    </>
                ) : (<p>No data available...</p>)}
        </div>
    if (updation) finalJSX = <ToDoAdd method='put' data={singleval} />
    return (
        finalJSX
    )
};


export default ToDoHome
