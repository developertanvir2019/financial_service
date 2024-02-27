import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const useRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  useEffect(() => {
    if (userId) {
      console.log(userId);
      const fetchRole = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/user/${userId}`
          );
          setRole(response.data.role);
          setBalance(response.data.balance);
          setLoading(false);
        } catch (error) {
          setError(error.response.data.error);
          setLoading(false);
        }
      };

      fetchRole();
    }
  }, [userId]);

  return { role, loading, error, balance };
};

export default useRole;
