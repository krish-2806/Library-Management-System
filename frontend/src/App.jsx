import { memo } from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './shared/ProtectedRoute';
import AdminLayout from './Admin/AdminLayout';
import AdminDashboardPage from './Admin/AdminDashboardPage';
import AdminBooksPage from './Admin/AdminBooksPage';
import AdminUsersPage from './Admin/AdminUsersPage';
import AdminFinesPage from './Admin/AdminFinesPage';
import UserLayout from './user/UserLayout';
import UserDashboardPage from './user/UserDashboardPage';
import UserBookPage from './user/UserBookPage';
import UserEditProfile from './user/UserEditProfile';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      {/* Admin */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={ <AdminDashboardPage />} />
          <Route path="books" element={<AdminBooksPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="fines" element={<AdminFinesPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRole="user" />}>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
          <Route path="books" element={<UserBookPage />} />
          <Route path="profile" element={<UserEditProfile />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default memo(App);