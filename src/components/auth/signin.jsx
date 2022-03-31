import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase/firebase";
import { LOGGED_IN_USER } from "../../redux/actionTypes";
import "./signin.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

export const SignIn = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  const googleLogin = async () => {
    setShow(false);
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
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
        navigate("/loggedIn");
      })
      .catch((err) => {
        console.log(err.message);
        window.location.reload();
      });
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vehicle Services</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="main">
            <h2>Welecome back</h2>
            <div>
              <button onClick={googleLogin} className="signInBtn">
                {" "}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                  alt=""
                />
                Login with google{" "}
              </button>
              <br />
              <button className="signInBtn">
                {" "}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174848.png"
                  alt=""
                />
                Login with facebook{" "}
              </button>
              <br />
              <button className="signInBtn">
                {" "}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/0/747.png"
                  alt=""
                />
                Login with apple{" "}
              </button>
              <br />
              <button className="signInBtn">
                {" "}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  alt=""
                />
                Login with twitter{" "}
              </button>
              <br />
              <button className="signInBtn">
                {" "}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/646/646094.png"
                  alt=""
                />
                Sign in with Email{" "}
              </button>
            </div>

            <p className="para">
              Click “Sign In” to agree to Vehicle’s{" "}
              <span className="underline">Terms of Service</span> and
              acknowledge that Medium’s{" "}
              <span className="underline">Privacy Policy</span> applies to you.
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
