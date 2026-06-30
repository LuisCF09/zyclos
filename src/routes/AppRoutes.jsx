import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Catalog from '../pages/Catalog.jsx';
import ProductDetails from '../pages/ProductDetails.jsx';
import CreateListing from '../pages/CreateListing.jsx';
import Profile from '../pages/Profile.jsx';
import ImpactDashboard from '../pages/ImpactDashboard.jsx';
import Chat from '../pages/Chat.jsx';
import NotFound from '../pages/NotFound.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/roupa/:id" element={<ProductDetails />} />
      <Route path="/impacto" element={<ImpactDashboard />} />
      <Route
        path="/novo-anuncio"
        element={
          <ProtectedRoute>
            <CreateListing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/:productId"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
