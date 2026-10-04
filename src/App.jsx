import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import BrowsePartners from './pages/BrowsePartners';
import PartnerProfile from './pages/PartnerProfile';
import ListYourself from './pages/ListYourself';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyOtp from './pages/VerifyOtp';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import PaymentPage from './pages/PaymentPage';
import TermsAndConditions from './pages/TermsAndConditions';
import { Toaster } from 'sonner';
import Chats from './pages/Chats';
import Chat from './pages/Chat';

export default function App(){return <AuthProvider><BrowserRouter><Routes><Route element={<Layout/>}><Route index element={<Home/>}/><Route path="partners" element={<BrowsePartners/>}/><Route path="partners/:id" element={<PartnerProfile/>}/><Route path="chats" element={<ProtectedRoute><Chats/></ProtectedRoute>}/><Route path="chat/:bookingId" element={<ProtectedRoute><Chat/></ProtectedRoute>}/><Route path="payment/access" element={<ProtectedRoute><PaymentPage/></ProtectedRoute>}/><Route path="payment/listing" element={<ProtectedRoute><PaymentPage/></ProtectedRoute>}/><Route path="list-yourself" element={<ProtectedRoute><ListYourself/></ProtectedRoute>}/><Route path="dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/><Route path="login" element={<Login/>}/><Route path="signup" element={<Signup/>}/><Route path="verify-otp" element={<VerifyOtp/>}/><Route path="terms-and-conditions" element={<TermsAndConditions/>}/><Route path="not-found" element={<NotFound/>}/><Route path="*" element={<Navigate to="/not-found" replace/>}/></Route></Routes><Toaster position="top-right" richColors closeButton duration={3500} toastOptions={{ className: 'gm-toast' }} /></BrowserRouter></AuthProvider>}
