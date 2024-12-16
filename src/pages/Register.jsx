import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"; // Import axios for making API requests
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import validator from 'validator';

const Register = () => {
    const navigate = useNavigate(); // Hook for navigation
        
    const navigateTo = (path) => {
        navigate(path);
    };
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to store error message
    const [success, setSuccess] = useState(""); // State to store success message
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true while waiting for response
        setError(""); // Clear any previous errors
        setSuccess(""); // Clear any previous success messages

        if (!isValidPassword(password)) {
            alert("Необходимо 8 символов, минимум 1 буква в нижнем регистре, минимум 1 буква в верхнем регистре, минимум 1 цифра, минимум 1 спец. символ!");
            return;
        }

        try {
        const response = await axios.post("http://127.0.0.1:8000/api/register", {
            name,
            email,
            password,
        });

        console.log("Response:", response.data); // Log the response to check success

        // Handle success response: display the success message and handle further actions
        setSuccess("Регистрация прошла успешно! Пожалуйста, войдите в систему.");
        } catch (err) {
        setLoading(false); // Set loading to false when the request is done
        if (err.response) {
            console.error("Error response:", err.response); // Log the full response

            // Check if there are validation errors
            if (err.response.data.errors) {
            setError(err.response.data.errors.email || "Регистрация не удалась. Попробуйте еще раз.");
            } else {
            setError(err.response.data.message || "Регистрация не удалась");
            }
        } else {
            setError("Что-то пошло не так.");
        }
        }
    };

    const isValidPassword = (password) => {
    
        if (validator.isStrongPassword(password, { 
        minLength: 8, minLowercase: 1, 
        minUppercase: 1, minNumbers: 1, minSymbols: 1 
        })) { 
            setErrorMessage('Хороший пароль!');
            return true;
        } else { 
            setErrorMessage('Необходимо 8 символов, минимум 1 буква в нижнем регистре, минимум 1 буква в верхнем регистре, минимум 1 цифра, минимум 1 спец. символ!');
        }
    };

    return (    
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">
                                <div className="mt-4">
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() => navigateTo('/')}
                                    >
                                        Главная
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigateTo('/login')}
                                    >
                                        Войти
                                    </button>
                                </div>
                                <div className="mb-md-5 mt-md-4 pb-5">
                                <h2 className="text-center mb-4">Зарегистрироваться</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Имя
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Введите ваше имя"
                                        required
                                    />
                                    </div>
                                    <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Введите ваш email"
                                        required
                                    />
                                    </div>
                                    <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Пароль
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Введите ваш пароль"
                                        required
                                    />
                                    </div>
                                    {errorMessage === '' ? null : 
                                        <span style={{ 
                                            fontWeight: 'bold', 
                                            color: 'red', 
                                        }}>{errorMessage}</span>}
                                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? "Регистрация..." : "Зарегистрироваться"}
                                    </button>
                                </form>

                                {/* Display error or success messages */}
                                {error && <div className="alert alert-danger mt-3">{error}</div>}
                                {success && <div className="alert alert-success mt-3">{success}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
