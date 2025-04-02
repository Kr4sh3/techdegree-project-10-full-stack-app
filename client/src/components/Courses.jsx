import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        //Fetch and set courses data
        axios.get('http://localhost:5000/api/courses')
            .then((data) => {
                setCourses(data.data);
                if (data.data === null)
                    navigate("/notfound")
            }).catch(error => {
                console.log("There was an error while fetching the data!", error);
                navigate("/error");
            }
            )
    }, []);

    if (!courses)
        return <h1>Loading Courses...</h1>
    return (
        <main>
            <div className="wrap main--grid">
                {
                    courses.map((course) => {
                        return (
                            <Link key={`course-link-${course.id}`} className="course--module course--link" to={`/courses/${course.id}`}>
                                <h2 className="course--label">Course</h2>
                                <h3 className="course--title">{course.title}</h3>
                            </Link>
                        )
                    })
                }
                <Link id="create-course" className="course--module course--add--module" to="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
        </main>
    )
};

export default Courses;