import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import Loading from "./Components/Loading";
import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";

const HomePage = lazy(() => import("./Pages/HomePage"));
const BooksPage = lazy(() => import("./Pages/Books/BooksPage"));
const BookDetails = lazy(() => import("./Pages/Books/BookDetails"));
const AddBookPage = lazy(() => import("./Pages/Books/AddBookPage"));
const EditBookPage = lazy(() => import("./Pages/Books/EditBookPage"));
const DeleteBookPage = lazy(() => import("./Pages/Books/DeleteBookPage"));
const SignupPage = lazy(() => import("./Pages/Auth/SignupPage"));
const LoginPage = lazy(() => import("./Pages/Auth/LoginPage"));

function App() {

  return (
    <>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/add" element={<AddBookPage />} />
            <Route path="/books/edit/:id" element={<EditBookPage />} />
            <Route path="/books/delete/:id" element={<DeleteBookPage />} />
            <Route path="/books/:id" element={<BookDetails />} />

            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
