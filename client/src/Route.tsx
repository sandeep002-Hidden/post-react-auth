import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import AuthLayout from "./Layout/AuthLayout";
import UnAuthlayout from "./Layout/UnAuth";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Signup from "./routes/Signup/Signup";
import ForgetPassword from "./routes/forgetPassword/ForgetPassword";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<UnAuthlayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgetpassword" element={<ForgetPassword/>}/>
      </Route>
      <Route path="/home" element={<AuthLayout />}>
        <Route index element={<Home />} />
      </Route>
    </>
  )
);