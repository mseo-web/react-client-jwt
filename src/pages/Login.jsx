import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Using Bootstrap for basic styling

const Login = () => {
    const navigate = useNavigate(); // Hook for navigation
            
    const navigateTo = (path) => {
        navigate(path);
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                email,
                password,
            });

            console.log("Response:", response.data);
            if (response.data.token && response.data.user) {
                setSuccess("Вход выполнен успешно!");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/dashboard");
            } else {
                setError("Неверный ответ на вход. Попробуйте еще раз.");
            }
            } catch (err) {
            setLoading(false);
            if (err.response) {
                setError(err.response.data.error || "Не удалось войти. Попробуйте еще раз.");
            } else {
                setError("Что-то пошло не так. Попробуйте еще раз.");
            }
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
                                        onClick={() => navigateTo('/register')}
                                    >
                                        Зарегистрироваться
                                    </button>
                                </div>
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="text-center mb-4">Вход</h2>
                                    <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Введите ваш email"
                                        required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Пароль:</label>
                                        <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Введите ваш пароль"
                                        required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                        {loading ? "Вход в систему..." : "Войти"}
                                    </button>
                                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                                    {success && <div className="alert alert-success mt-3">{success}</div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;