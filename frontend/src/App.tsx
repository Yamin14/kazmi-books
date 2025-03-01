import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Loading from "./Components/Loading";
import Layout from "./Components/Layout";
const HomePage = lazy(() => import("./Pages/HomePage"));
const BooksPage = lazy(() => import("./Pages/BooksPage"));
const BookDetails = lazy(() => import("./Pages/BookDetails"));
const AddBookPage = lazy(() => import("./Pages/AddBookPage"));
const EditBookPage = lazy(() => import("./Pages/EditBookPage"));
const DeleteBookPage = lazy(() => import("./Pages/DeleteBookPage"));

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
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
