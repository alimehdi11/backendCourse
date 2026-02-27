import React from "react";
import Books from "./pages/book/Books";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookForm from "./pages/book/BookForm";
import Navbar from "./components/Navbar";
import Students from "./pages/student/Students";
import StudentForm from "./pages/student/StudentForm";
import AuthForm from "./pages/authForm";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="mt-3">
        <Routes>
          {/* Books routes */}
          <Route path="/books" element={<Books />}>
            <Route path="create" element={<BookForm />} />
            <Route path="edit/:id" element={<BookForm />} />
          </Route>

          {/* Students routes */}
          <Route path="/students" element={<Students />}>
            <Route path="create" element={<StudentForm />} />
            <Route path="edit/:id" element={<StudentForm />} />
          </Route>

          {/* Auth routes */}
          <Route
            path="/auth/:type"
            element={<AuthForm />}
          />
          <Route
            path="/auth/:type"
            element={<AuthForm />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
