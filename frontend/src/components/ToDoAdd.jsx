import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

import axios from 'axios'
import Swal from 'sweetalert2'
const ToDoAdd = (props) => {
    console.log("props data", props.data);
    const [inputs, setInputs] = useState(props.data);
    const navigate = useNavigate();






    // function to handle inputs from form
    const inputHandler = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed - Name: ${name}, Value: ${value}`);
        setInputs({
            ...inputs, [name]: value
        });
    }



    // function to handle from inputs when submit button is clicked
    const submitHandler = () => {


        let data = {



            eventname: inputs.eventname,
            status: inputs.status,


        }

        // post function
        if (props.method === "post") {
            axios.post(`http://localhost:5000/api/postdata`, data)
                .then((response) => {
                    if (response.data.message === "Posted successfully") {
                        console.log("response post", response);
                        Swal.fire('', response.data.message, 'success');
                        navigate('/');
                    }
                    else {
                        Swal.fire('Sorry', response.data.message, '');
                    }
                })
                .catch((err) => { console.log(err) })
        }
        // update function
        if (props.method === "put") {
            axios.put(`http://localhost:5000/api/putdata/${inputs._id}`, data)
                .then((response) => {
                    if (response.data.message === "Updated successfully") {
                        Swal.fire('', response.data.message, 'success');
                        window.location.reload(false);
                    }
                    else {
                        Swal.fire('Sorry', response.data.message, '');
                    }
                })
                .catch((err) => { console.log(err) })
        }
    }



    return (
        <div>
            {/* To Do form */}
            <div className="container w-50 mt-5 pt-5  bg-secondary-subtle rounded">
                <h3>TO DO Form</h3>
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-2">


                            {/* Name of Event */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                                        <label htmlFor="name" className="form-label">
                                            Event Name :
                                        </label>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                                        <input
                                            type="text"
                                            id="name"
                                            className={`form-control ${inputs.status === 'COMPLETED' ? 'completed-event' : ''
                                                }`}
                                            name="eventname"
                                            value={inputs.eventname}
                                            onChange={inputHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Status  */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                                        <label htmlFor="course" className="form-label">Status :</label>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                                        <select className="form-select required"
                                            aria-label="Default select example"
                                            name="status"
                                            value={inputs.status}
                                            onChange={inputHandler}>
                                            <option defaultValue></option>
                                            <option value="COMPLETED">COMPLETED</option>
                                            <option value="ONGOING">ONGOING</option>

                                        </select>

                                    </div>
                                </div>
                            </div>


                            {/* Button*/}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    {/* offset */}
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                    </div>
                                    {/* Button Submit*/}
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                        <button className="btn btn-success" onClick={submitHandler}>Submit</button>
                                    </div>
                                    {/* Button */}
                                    <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3">
                                        <a href="/"><button className="btn btn-warning">Back to Dashboard</button></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    )
}

export default ToDoAdd