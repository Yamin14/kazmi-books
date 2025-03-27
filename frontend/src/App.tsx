import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import Loading from "./Components/Loading";
import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import PublicRoute from "./Components/Auth/PublicRoute";
import AdminRoute from "./Components/Auth/AdminRoute";

const HomePage = lazy(() => import("./Pages/HomePage"));
const BooksPage = lazy(() => import("./Pages/Books/BooksPage"));
const BookDetails = lazy(() => import("./Pages/Books/BookDetails"));
const AddBookPage = lazy(() => import("./Pages/Books/AddBookPage"));
const EditBookPage = lazy(() => import("./Pages/Books/EditBookPage"));
const DeleteBookPage = lazy(() => import("./Pages/Books/DeleteBookPage"));
const SignupPage = lazy(() => import("./Pages/Auth/SignupPage"));
const SellerSignupPage = lazy(() => import("./Pages/Auth/SellerSignupPage"));
const LoginPage = lazy(() => import("./Pages/Auth/LoginPage"));
const LogoutPage = lazy(() => import("./Pages/Auth/LogoutPage"));
const PendingSellers = lazy(() => import("./Pages/Admin/PendingSellers"));
const PendingSellerDetails = lazy(() => import("./Pages/Admin/PendingSellerDetails"));
function App() {

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetails />} />

          {/* Protected Book Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/books/add" element={<AddBookPage />} />
            <Route path="/books/edit/:id" element={<EditBookPage />} />
            <Route path="/books/delete/:id" element={<DeleteBookPage />} />
            <Route path="/auth/logout" element={<LogoutPage />} />
          </Route>

          {/* Auth Routes - Only accessible to logged out users */}
          <Route element={<PublicRoute />}>
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/auth/seller-signup" element={<SellerSignupPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/pending-sellers" element={<PendingSellers />} />
            <Route path="/admin/pending-sellers/:id" element={<PendingSellerDetails />} />
          </Route>

        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
