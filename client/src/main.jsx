import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound.jsx'

import SignUp from './pages/SignUp';
import Login from './components/Login';

import './index.scss';
import Shipping from './components/Checkout/Checkout.jsx';
import ConfirmOrder from './pages/Home/confirmorder.jsx';
import PaymentForm from './pages/Home/Onlinepayment.jsx';
import PaymentSuccess from './pages/Home/PaymentSuccessfull.jsx';
import RecentPurchases from './pages/Recent_Purchases';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/checkout',
        element: <Shipping />
      },
      {
        path: '/confirm',
        element: <ConfirmOrder />
      },
      {
        path: '/online',
        element: <PaymentForm />
      },
      {
        path: '/successfull',
        element: <PaymentSuccess />
      },
      {
        path: '/recent-purchases',
        element: <RecentPurchases />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
