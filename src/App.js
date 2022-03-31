import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase/firebase";
import { LOGGED_IN_USER } from "./redux/actionTypes";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/nav/navbar";
import { SignIn } from "./components/auth/signin";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    authentication();
  }, []);
  const authentication = async () => {
    const userAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { token, claims } = await user.getIdTokenResult();
        const { name, picture } = claims;

        dispatch({
          type: LOGGED_IN_USER,
          payload: {
            email: user.email,
            role:
              user.email === process.env.REACT_APP_ADMIN
                ? "admin"
                : "subscriber",
            name,
            picture,
            token,
          },
        });
      }
    });
    return () => userAuth();
  };
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<SignIn />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
