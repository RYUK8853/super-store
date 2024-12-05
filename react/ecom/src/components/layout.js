import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginSignup from "../pages/LoginSignup";

// Navbar Component
export function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
      // Clear any user data like authentication tokens, etc.
      localStorage.removeItem('authToken');  // Example, replace with your logic
  
      // Redirect to the Login/Signup page
      navigate('/login-signup');
    };
    return (
        <header className="bg-info text-white py-4">
            <div className="container text-center">
                <h1 className="display-4 fw-bold">Super-store</h1>
            </div>
            <div className="text-center mt-3">
                <div className="dropdown d-inline-block">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="profileDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Profile
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                        <li>
                            <Link className="dropdown-item" to="/admin/products">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item btn btn-danger"to="/login-signup" >
                                Log-out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

// LandingPage Component
export function LandingPage() {
    return (
        <div
            className="vh-100 d-flex flex-column justify-content-center align-items-center text-white"
            style={{
                background: "linear-gradient(-45deg, #e0f7fa, #80deea, #26c6da, #007bb5)",
                backgroundSize: "400% 400%",
                animation: "gradient-animation 10s ease infinite",
            }}
        >
            <div className="text-center mb-5">
                <h2 className="display-5 fw-bold">Welcome to Super-store</h2>
                <p className="fs-4">
                    Your one-stop shop for a wide range of products, fast delivery, and the best prices!
                </p>
                <button className="btn btn-light btn-lg">Shop Now</button>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <h5 className="card-title">Wide Range of Products</h5>
                                <p className="card-text">
                                    Explore a variety of products tailored to your needs.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <h5 className="card-title">Fast Delivery</h5>
                                <p className="card-text">
                                    Get your products delivered to your doorstep in no time.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <h5 className="card-title">Best Prices</h5>
                                <p className="card-text">
                                    Enjoy unbeatable prices on all your favorite items.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Footer Component
export function Footer() {
    return (
        <div className="text-center py-4 border-top bg-light">
            <img
                src="/grocery-store.png"
                alt="Grocery Store Logo"
                width="30"
                className="me-2"
            />
            <span className="text-secondary">Super-store &copy; 2024</span>
        </div>
    );
}

// Add the keyframe animation directly to the DOM
const style = document.createElement("style");
style.innerHTML = `
    @keyframes gradient-animation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;
document.head.appendChild(style);
