import React, { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import MainScreen from "../mainScreen/MainScreen";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../Actions/UserActions";
import { toast } from "react-toastify";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    cpassword: "",
  });

  const navigate = useNavigate();
  const userData = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };
  const notifySucc = (msg) => toast.success(msg);
  const notifyErr = (msg) => toast.error(msg);
  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector((state) => state.SignedUp);
  const signupHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(validateForm(userdata));
    console.log("payload data", userInfo);
  };

  // validation function
  const validateForm = (values) => {
    let error = {};
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.name) {
      error.name = "name Field is requied!";
    } else if (values.name.length < 3) {
      error.name = "please have min 3 length of your name";
    }
    if (!values.phone) {
      error.phone = "please enter phone number";
    } else if (values.phone.length != 10) {
      error.phone = "Length of your phone number should be 10 digits";
    }
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
    if (!values.cpassword) {
      error.cpassword = "Cpasswoed field requied!";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm passwoed does not match!";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      dispatch(
        signupAction(
          userdata.name,
          userdata.phone,
          userdata.email,
          userdata.password
        )
      );
    }
  }, [errors]);

  useEffect(() => {
    if (userInfo) {
      notifySucc("user successfuly signed up Please login now!");
      navigate("/login");
    }
    if (error) {
      notifyErr(error);
    }
  }, [userInfo, error]);
  return (
    <div className="container my-4">
      {loading && <Spinner />}
      <MainScreen title="Signup you Account Here">
        <Form className="m-auto">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-5">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={(event) => {
                userData(event);
              }}
            />
          </Form.Group>
          <div className="text-danger">{errors.name}</div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-5">Phone</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              placeholder="Enter Phone Number"
              onChange={(event) => {
                userData(event);
              }}
            />
          </Form.Group>
          <div className="text-danger">{errors.phone}</div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-5">Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={(event) => {
                userData(event);
              }}
            />
          </Form.Group>
          <div className="text-danger">{errors.email}</div>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fs-5">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={(event) => {
                userData(event);
              }}
            />
          </Form.Group>
          <div className="text-danger">{errors.password}</div>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fs-5">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="cpassword"
              placeholder="Password"
              onChange={(event) => {
                userData(event);
              }}
            />
          </Form.Group>
          <div className="text-danger">{errors.cpassword}</div>

          <div className="my-2">
            If already Account Exist Then <Link to="/login">click here</Link>{" "}
            for login
          </div>
          <Button variant="primary" type="submit" onClick={signupHandler}>
            Signup Here
          </Button>
        </Form>
      </MainScreen>
    </div>
  );
};

export default Signup;
