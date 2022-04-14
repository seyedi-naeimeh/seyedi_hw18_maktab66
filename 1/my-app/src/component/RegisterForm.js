import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";


const RegisterForm = () => {
  const [provinces, setProvinces] = useState({});
  const [cities, setCities] = useState([]);
  const [info, setInfo] = useState([]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      education: "",
      educationPlace: "",
      province: "",
      city: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      axios
        .post("http://localhost:4000/users", values)
        .then(() => infoUsers())
        .catch((error) => {});
    },
  });

  useEffect(() => {
    fetch("iranstates.json")
      .then((response) => response.json())
      .then((item) => {
        setProvinces(item);
      });
  }, []);

  //get data from json
  const infoUsers = () => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => setInfo(response.data))
      .catch((error) => {});
  };

  useEffect(() => {
    infoUsers();
  }, []);

  const inuptChangeHandler = (event) => {
    if (event.target.name === "province") {
      Object.entries(provinces).forEach(([key, val]) => {
        if (key === event.target.value) {
          setCities(val);
        }
      });
    }
  };
 
  return (
    <>
      <form onSubmit={formik.handleSubmit} key="index">
        <Form.Group className="mb-3 d-flex ">
          <Form.Control
            id="firstName"
            name="firstName"
            type="text"
            placeholder="نام "
            className="ms-2 inputStyle"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />

          <Form.Control
            id="lastName"
            name="lastName"
            type="text"
            className="inputStyle"
            placeholder="نام خانوادگی "
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
        </Form.Group>
        <Form.Control
          id="email"
          name="email"
          type="email"
          placeholder="ایمیل"
          className="inputStyle"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Form.Control
          id="password"
          name="password"
          type="text"
          placeholder="رمز ورود"
          className="inputStyle"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Form.Select
          as="select"
          type="select"
          name="education"
          aria-label="Default select example"
          className=" inputStyle mb-3"
          onChange={formik.handleChange}
        >
          <option value="تحصیلات">تحصیلات</option>
          <option value="کاردانی">کاردانی</option>
          <option value="کارشناسی">کارشناسی</option>
          <option value="کارشناسی ارشد">کارشناسی ارشد</option>
          <option value="دکترا">دکترا </option>
        </Form.Select>
        <Form.Group className="mb-3">
          <Form.Control
            id="educationPlace"
            name="educationPlace"
            type="text"
            placeholder="محل تحصیل"
            className="inputStyle"
            onChange={formik.handleChange}
            value={formik.values.educationPlace}
          />
        </Form.Group>
        <Form.Select
          type="select"
          name="province"
          as="select"
          className=" inputStyle mb-3"
          onChange={(e) => {
            formik.handleChange(e);
            inuptChangeHandler(e);
          }}
        >
          <option value="استان">استان</option>
          {Object.keys(provinces).map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          type="select"
          name="city"
          as="select"
          className=" inputStyle mb-3"
          onChange={(e) => {
            formik.handleChange(e);
            inuptChangeHandler(e);
          }}
        >
          <option value="شهر">شهر</option>
          {cities.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </Form.Select>

        <Button type="submit" className="btn btn-success w-100 mt-3">
          ثبت نام
        </Button>
      </form>
      
    </>
  );
};

export default RegisterForm;
