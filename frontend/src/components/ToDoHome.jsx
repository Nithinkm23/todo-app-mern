import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button, Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ToDoAdd from './ToDoAdd'
import Swal from 'sweetalert2'

const ToDoHome = () => {


    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('all'); // Default to 'all'
    const [updation, setUpdation] = useState(false);
    const [singleval, setSingleval] = useState([]);
    const [loading, setLoading] = useState(true);

    //for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;//Number of item per page

    const handleTaskStatusChange = (taskId) => {
        const updatedData = data.map((item) =>
          item._id === taskId ? { ...item, status: item.status === 'COMPLETED' ? 'ONGOING' : 'COMPLETED' } : item
        );
        setData(updatedData);
        // You can also update the status on the server using an API call if needed
      };

    //to get Learners data from database
    const fetchDatafromAPI = (pageNumber) => {

        return axios
            .get(`http://localhost:5000/api/getdata/`)
            .then((response) => {
                //console.log("Data from get"+response.data);

                const resData = response.data.data;

                let filteredData = resData;
                console.log("Filtered Data:", filteredData);
                if (filter === 'COMPLETED') {
                    filteredData = resData.filter(task => task.status === 'COMPLETED');
                } else if (filter === 'ONGOING') {
                    filteredData = resData.filter(task => task.status === 'ONGOING');
                }

                const startIndex = (pageNumber - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const paginatedData = filteredData.slice(startIndex, endIndex);
                setData(paginatedData);
                setTotalPages(Math.ceil(filteredData.length / pageSize));


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

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1); // Reset page number when changing the filter
    };


    let finalJSX =
        <div className="container w-75 mt-4 pt-4">
            {/* Button to add ToDo data using form */}
            <Link to="/todoadd">
                <Button variant="success" className="mb-3">
                    <ion-icon name="person-add-outline" size="large"></ion-icon>
                </Button>
            </Link>
            &nbsp;&nbsp;&nbsp;

            {/* Filter controls */}
            <div className="filter-controls">
                <label>
                    <input
                        type="radio"
                        value="all"
                        checked={filter === 'all'}
                        onChange={handleFilterChange}
                    />
                    All
                </label>
                <label>
                    <input
                        type="radio"
                        value="COMPLETED"
                        checked={filter === 'COMPLETED'}
                        onChange={handleFilterChange}
                    />
                    Completed
                </label>
                <label>
                    <input
                        type="radio"
                        value="ONGOING"
                        checked={filter === 'ONGOING'}
                        onChange={handleFilterChange}
                    />
                    Ongoing
                </label>
            </div>


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
                                    <th>Check</th>
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
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={value.status === 'COMPLETED'}
                                                onChange={() => handleTaskStatusChange(value._id)}
                                            />
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
