import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import MainScreen from "../mainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../Actions/UserActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useNavigate();
  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });
  const userData = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };
  const { loading, userInfo, error } = useSelector(
    (state) => state.userReducer
  );
  const validateForm = (values) => {
    let error = {};
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.email) {
      error.email = "email Field is requied!";
    } else if (!regex.test(values.email)) {
      error.email = "email is not valid!";
    }
    if (!values.password) {
      error.password = "password Field is requied!";
    } else if (values.password.length < 4) {
      error.password = "password length should be more than 4";
    } else if (values.password.length > 8) {
      error.password = "password length should be less than 8";
    }
    return error;
  };
  const notifySucc = (msg) => toast.success(msg);
  const notifyErr = (msg) => toast.error(msg);
  const SubmitHandler = (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("userDAta", userdata);
    setErrors(validateForm(userdata));
    console.log("errors", errors);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      dispatch(LoginAction(userdata.email, userdata.password));
    }
  }, [errors]);
  useEffect(() => {
    if (userInfo) {
      notifySucc("logged In Successfully!");
      history("/mynotes");
    }
    if (error) {
      notifyErr(error);
    }
  }, [userInfo, history, error]);
  return (
    <div className="container my-4">
      {loading && <Spinner />}
      <MainScreen title="Login your Account Here">
        <Form className="m-auto">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-5">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => {
                userData(event);
              }}
              name="email"
            />
          </Form.Group>
          <div className="text-danger">{errors.email}</div>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fs-5">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => {
                userData(event);
              }}
              name="password"
            />
          </Form.Group>
          <div className="text-danger">{errors.password}</div>
          <div className="my-2">
            If Account does not exists Then <Link to="/signup">click here</Link>
            for signup
          </div>
          <Button variant="primary" type="submit" onClick={SubmitHandler}>
            Login Now
          </Button>
        </Form>
      </MainScreen>
    </div>
  );
};
export default Login;
