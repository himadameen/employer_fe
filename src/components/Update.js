import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';


const Update = () => {

    const initialValues = {
        username: "",
        email: "",
        phone: "",
        status: "",
        gender: "",
        profile: "",
    }

    const { _id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(initialValues);

    const callApi = async () => {
        const url = `http://localhost:2000/${_id}`;
        const response = await axios.get(url);
        setData(response.data)
    }

    useEffect(() => {
        callApi();
    }, [])

    const handle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        const url = `http://localhost:2000/update/${_id}`;
        const response = await axios.put(url, data);
        console.log(response.data);
        if (response.status === 200) {
            navigate('/details');
        } else {
            window.alert('Not Updated');
        }
    }



    let base64String = "";

    const imageUploaded = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
            base64String = reader.result;
            setData((pre) => ({ ...pre, profile: base64String }));
        }
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    }

    return (
        <>
            <div className='fullcont'>
            <div id='back'>
                <Link to='/details'><i class="fa fa-chevron-circle-left" aria-hidden="true">Back</i></Link>
            </div>
                <div className='container2' >
                    <h2>Update Employee Details</h2>
                    <div className='ui divider'></div>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Username</label>
                            <input type='text' name='username' placeholder='enter your name' value={data.username} onChange={(e) => handle(e)} />
                        </div>

                        <div className='field'>
                            <label>Email</label>
                            <input type='email' name='email' placeholder='enter your email' value={data.email} onChange={(e) => handle(e)} />
                        </div>

                        <div className='field'>
                            <label>Phone</label>
                            <input type='number' name='phone' placeholder='enter your phone number' maxLength={10} value={data.phone} onChange={(e) => handle(e)} />
                        </div>

                        <div className='field' id="status"  >
                            <label >Status</label>
                            <input type='radio' name="status" value="active" checked={data.status === 'active'} onChange={(e) => handle(e)} />Active
                            <input type='radio' name="status" value="deactive" checked={data.status === 'deactive'} onChange={(e) => handle(e)} />DeActive
                        </div>

                        <div className='field'>
                            <label>Gender</label>
                            <select name="gender" value={data.gender} onChange={(e) => handle(e)}>
                                <option >Select the Gender</option>
                                <option value="male">Male</option>
                                <option value="female" >Female</option>
                                <option value="others" >Others</option>
                            </select>
                        </div>

                        <div className='field'>
                            <label>Profile Pic</label>
                            <input type="file" name='image' id="image" values={data.profile} onChange={imageUploaded} />
                        </div>

                        <button className='fluid ui button' id='btn' onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Update;