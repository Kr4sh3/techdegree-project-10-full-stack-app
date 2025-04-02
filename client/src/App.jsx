import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from "./components/CourseDetail";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import CreateCourse from "./components/CreateCourse";
import PrivateRoute from "./components/PrivateRoute";
import UpdateCourse from "./components/UpdateCourse";
import Forbidden from "./components/Forbidden";
import UnhandledError from "./components/UnhandledError";
import NotFound from "./components/NotFound";

function App() {

  return (
    <BrowserRouter>
      <Header />
      {
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignOut" element={<SignOut />} />
          <Route element={<PrivateRoute />}>
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
            <Route path="/courses/create" element={<CreateCourse />} />
          </Route>
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/error" element={<UnhandledError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      }
    </BrowserRouter>
  )
}

export default App
