import React, { useState } from 'react';

    function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true); // To toggle between login and signup forms
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Toggle between login and signup forms
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({
            email: '',
            password: '',
            confirmPassword: '', // Clear confirmPassword field if switching to login
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (isLogin) {
            if (!formData.email || !formData.password) {
                alert('Please fill out all fields');
            } else {
                // Handle login logic here (e.g., API call)
                alert('Login successful');
            }
        } else {
            if (!formData.email || !formData.password || !formData.confirmPassword) {
                alert('Please fill out all fields');
            } else if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match');
            } else {
                // Handle signup logic here (e.g., API call)
                alert('Signup successful');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {!isLogin && (
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary w-100">
                                    {isLogin ? 'Login' : 'Sign Up'}
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-link"
                                    onClick={toggleForm}
                                >
                                    {isLogin ? 'Create an account' : 'Already have an account? Login'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
