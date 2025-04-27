import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PaymentForm from './pages/PaymentForm';
import PaymentResult from './pages/PaymentResult';
import Products from './pages/Products';
import Summary from './pages/Summary';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow mt-20">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment-form" element={<PaymentForm />} />
            <Route path="/payment-result" element={<PaymentResult />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
