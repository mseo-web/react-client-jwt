import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap for styling

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        axios
          .get("http://127.0.0.1:8000/api/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log("Dashboard data:", response.data);
          })
          .catch((error) => {
            setError("Failed to fetch dashboard data.");
            console.error(error);
          });
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Logout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear local storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Failed to log out.");
    }
  };

  if (loading) return <p className="text-center text-secondary fs-5">Загрузка...</p>;

  return (
    <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                        <div className="card-body p-5 text-center">
                            <div className="mb-md-5 mt-md-4 pb-5">
                                <h2 className="text-center text-primary mb-4">Добро пожаловать в панель управления</h2>
                                {error && <p className="text-danger text-center">{error}</p>}
                                {user && (
                                <div className="alert alert-info text-center">
                                    <p>
                                    Привет, <strong>{user.name}</strong>!
                                    </p>
                                    <p>Ваш email: {user.email}</p>
                                </div>
                                )}
                                <button
                                onClick={handleLogout}
                                className="btn btn-danger d-block mx-auto"
                                >
                                Выйти
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Dashboard;