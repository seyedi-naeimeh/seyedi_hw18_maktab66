import React, { useState, useEffect } from "react";
import { Formik, Field, Form  , ErrorMessage} from "formik";
import WithLogin from "../WithLogin";
import * as Yup from "yup"; 
import axios from "axios";

const LoginForm = ({ user, setUser, islogin, setIslogin }) => {
  const [infoUsers, setInfoUsers] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => setInfoUsers(response.data))
      .catch((error) => {});
  }, []);

//validation login form
const signInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars minimum"),
});
  
  return (
    <>
      <Formik
        validationSchema={signInSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            infoUsers.map((item) => {
              if (
                values.email === item.email &&
                values.password === item.password
              ) {
                setUser(item);
                setIslogin(true);
              }
            });
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting ,touched ,errors }) => (
          <Form>
            <div className="form-group inputStyle">
              <Field
                name="email"
                className="form-control inputStyle"
                  
                type="email"
                placeholder="ایمیل"
              />
              <ErrorMessage name="email" component="span" className="error" />
            </div>
            <div className="form-group">
              <Field
                name="password"
                className="form-control inputStyle"
                type="text"
                placeholder="رمز ورود"
              />
              <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success w-100 mt-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "لطفا صیر کنید..." : "ورود"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default WithLogin(LoginForm);
