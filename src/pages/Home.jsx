import React from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                        <div className="card-body p-5 text-center">
                            <div className="mb-md-5 mt-md-4 pb-5">
                                <div className="text-center mt-5">
                                    <h1>Тестовое задание компании Polis.online</h1>

                                    {/* Buttons */}
                                    <div className="mt-4">
                                        <button
                                        className="btn btn-primary me-2"
                                        onClick={() => navigateTo('/login')}
                                        >
                                        Войти
                                        </button>
                                        <button
                                        className="btn btn-primary"
                                        onClick={() => navigateTo('/register')}
                                        >
                                        Зарегистрироваться
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Home;