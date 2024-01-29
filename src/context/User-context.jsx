import axios from "../config/axiosConfig.js";
import { baseURL } from "../config/api.js";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
 
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(baseURL + "/users/loggeduser");
          setUser(response.data);
          console.log("fetchedUser =====>",response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUser();
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const date = `${e.target.year.value}-${e.target.month.value}-${e.target.day.value}`;
    const body = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      emailOrPhone: e.target.emailorphone.value,
      password: e.target.password.value,
      birthday: date,
      gender: e.target.gender.value,
    };
    try {
      const newUser = await axios.post(baseURL + "/users/register", body);
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const body = {
        emailOrPhone: e.target.emailOrPhone.value,
        password: e.target.password.value
    };

    try {
        const {data: user} = await axios.post(baseURL + "/users/login", body);
        localStorage.setItem("token", user.token);
        e.target.reset();

         console.log(user)
    } catch (error) {
        console.log(error);
      }

  };

  return (
    <UserContext.Provider value={{ handleSignIn, handleRegistration }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;