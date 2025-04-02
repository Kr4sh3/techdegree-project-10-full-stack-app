import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Markdown from 'react-markdown';
import axios from "axios";
import ErrorsDisplay from "./ErrorsDisplay";
import UserContext from "../context/UserContext";

const CourseDetail = () => {
    let { id } = useParams();
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        //Fetch and set courses data
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then((data) => {
                setCourse(data.data);
                if (data.data === null)
                    navigate("/notfound")
            }).catch(error => {
                console.log("There was an error while fetching the data!", error);
                navigate("/error");
            }
            )
    }, [id, navigate]);

    const handleDelete = async () => {
        //Build Header
        const options = {
            headers: {
                "Authorization": `Basic ${authUser.encodedCredentials}`
            }
        }
        //Attempt deletion, and redirect to home on success, otherwise set validation errors
        try {
            await axios.delete(`http://localhost:5000/api/courses/${id}`, options).then((res) => {
                if (res.status === 204) {
                    console.log(`Your course has successfully been deleted!`);
                    navigate("/", { replace: true });
                }
            });
        } catch (error) {
            if (error.status === 403) {
                setErrors(["You are not authorized to delete this course!"]);
            }
        }
    }

    if (!course)
        return <h1>Loading Course...</h1>
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {   //Show update and delete course buttons based on if a user is logged in and if they own the course
                        authUser && authUser.id === course.user.id ?
                            <>
                                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                <button className="button" onClick={handleDelete}>Delete Course</button></> : <> </>
                    }
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>

            <ErrorsDisplay errors={errors} />

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {`${course.user.firstName} ${course.user.lastName}`}</p>

                            <Markdown>{course.description}</Markdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <Markdown>{course.materialsNeeded}</Markdown>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
};

export default CourseDetail;