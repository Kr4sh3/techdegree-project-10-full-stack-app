import { useState, useContext, useRef } from "react";
import { useInRouterContext, useNavigate } from "react-router-dom";
import ErrorsDisplay from "./ErrorsDisplay";
import UserContext from "../context/UserContext";
import axios from "axios";

const CreateCourse = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        //Build courses object
        const course = {
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.id
        }

        //Build headers
        const options = {
            headers: {
                "Authorization": `Basic ${authUser.encodedCredentials}`
            }
        }
        //Attempt course creation, and redirect to home on success, otherwise set validation errors
        try {
            const response = await axios.post("http://localhost:5000/api/courses", course, options);
            if (response.status === 201) {
                console.log(`Your course has successfully been created!`);
                navigate("/");
            }
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} />

                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={courseDescription}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>);
}

export default CreateCourse;