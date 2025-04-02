import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import ErrorsDisplay from "./ErrorsDisplay";
import UserContext from "../context/UserContext";

const UpdateCourse = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { authUser } = useContext(UserContext);

    const [course, setCourse] = useState(null);
    const [errors, setErrors] = useState([]);
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

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
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        //Build Course
        const course = {
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
        }

        //Build Authenication Header
        const options = {
            headers: {
                "Authorization": `Basic ${authUser.encodedCredentials}`
            }
        }

        //Attempt update of course, Navigate to it if successful, and show errors if unsuccessful
        try {
            const response = await axios.put(`http://localhost:5000/api/courses/${id}`, course, options);
            if (response.status === 204) {
                console.log(`Your course has successfully been updated!`);
                navigate(`/courses/${id}`);
            }
        } catch (error) {
            if (error.status === 403) {
                setErrors(["You do not have permission to modify this course!"]);
            } else {
                setErrors(error.response.data.errors);
            }

        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    if (!course)
        return <h1>Loading Course...</h1>
    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} ref={courseTitle} />

                            <p>By {course.user.firstName} {course.user.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={courseDescription} defaultValue={course.description} />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded} defaultValue={course.materialsNeeded} />
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
}
export default UpdateCourse;