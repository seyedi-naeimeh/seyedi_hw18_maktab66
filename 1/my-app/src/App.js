import React, { useState } from "react";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import { Card, ToggleButton } from "react-bootstrap";
import Authentication from "./component/Authentication";

function App() {
  const [islogin, setIslogin] = useState(true);
  const [isregister, setIsregister] = useState(false);
  const [bgbtn2, setBgbtn2] = useState("primary");
  const [bgbtn1, setBgbtn1] = useState("success");

  let ShowRegisterBox = () => {
    if (!isregister) {
      setIsregister(true);
      setBgbtn2("success");
      setIslogin(false);
      setBgbtn1("primary");
    } else {
      setBgbtn1("primary");
      setBgbtn2("success");
    }
  };

  let ShowLoginBox = () => {
    if (!islogin) {
      setIslogin(true);
      setBgbtn1("success");
      setIsregister(false);
      setBgbtn2("primary");
    } else {
      setBgbtn1("success");
      setBgbtn2("primary");
    }
  };

  return (
    <Authentication>
      <Card className="mycard">
        <div>
          <ToggleButton
            className="w-50"
            type="submit"
            variant={bgbtn1}
            onClick={ShowLoginBox}
          >
            ورود
          </ToggleButton>
          <ToggleButton
            className="w-50"
            type="sumbit"
            variant={bgbtn2}
            onClick={ShowRegisterBox}
          >
            ثبت نام
          </ToggleButton>
        </div>
        <div>
          {islogin && <LoginForm />}

          {isregister && <RegisterForm />}
        </div>
      </Card>
    </Authentication>
  );
}

export default App;
