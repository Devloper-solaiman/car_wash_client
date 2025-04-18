/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Checkbox } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { IoMdLock, IoMdMail } from "react-icons/io";
import CWForm from "../../components/form/CWForm";
import CWInput from "../../components/form/CWInput";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { verifyToken } from "../../utils/VerifyToken";
import Container from "../../components/ui/Container";
import Logo from "../../components/ui/Logo";
import BackButton from "../../components/serviceSlots/BackButton";

type TLoginFormValues = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [defaultValues, setDefaultValues] = useState<TLoginFormValues>({
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setDefaultValues((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const onSubmit = async (data: TLoginFormValues) => {
    const toastId = toast.loading("Logging in...");
    if (rememberMe) {
      localStorage.setItem("savedEmail", data.email);
    } else {
      localStorage.removeItem("savedEmail");
    }

    try {
      const res = await loginUser(data).unwrap();
      if (res.token) {
        const userData = verifyToken(res.token) as TUser;
        dispatch(setUser({ user: userData, token: res.token }));
        navigate("/");
      }
      toast.success("Successfully logged in", {
        id: toastId,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  const handleDemoLogin = (email: string, password: string) => {
    setDefaultValues({ email, password });
  };

  return (
    <Container>
      <div className="h-screen flex flex-col justify-center">
        <BackButton />
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-center">
          <div className="w-full h-[400px] bg-white rounded-l-md p-6">
            <CWForm onSubmit={onSubmit} defaultValues={defaultValues}>
              <div className="flex flex-col items-start justify-start">
                <Logo />
              </div>
              <h2 className="text-3xl font-bold my-4 text-warning flex items-center justify-center">
                Log in
              </h2>
              <div
                className={`flex flex-col items-center justify-center gap-5 rounded-md p-5 w-full lg:max-w-md mx-auto`}
              >
                <CWInput
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  required
                  type="email"
                  icon={<IoMdMail className="text-2xl text-warning" />}
                />
                <CWInput
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  required
                  type="password"
                  icon={<IoMdLock className="text-2xl text-warning" />}
                />
                <div className="flex py-2 justify-between w-full">
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={"text-black"}
                    color="warning"
                  >
                    <p className="text-black">Remember me</p>
                  </Checkbox>
                  <Button
                    isLoading={isLoading}
                    color="warning"
                    type="submit"
                    radius="full"
                    className="transition duration-200 ease-in-out transform hover:scale-105 text-white w-[100px]"
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            </CWForm>
          </div>
          <div
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dcbvputnw/image/upload/v1744122824/carw_rdnaqa.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex flex-col items-center justify-center w-full h-[400px] bg-warning rounded-r-md p-4 relative"
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3 className="text-white text-3xl font-bold mb-4 z-10">
              Welcome Back
            </h3>
            <div className="z-10 text-white text-center mb-4 space-y-2">
              <p>Demo Credentials:</p>
              <Button
                className="text-white bg-transparent underline cursor-pointer border border-default-100/40 rounded-full"
                onClick={() =>
                  handleDemoLogin("test@g.com", "Aa@123456789")
                }
              >
                Admin: test@g.com / Aa@123456789
              </Button>
              <Button
                className="text-white bg-transparent underline cursor-pointer border border-default-100/40 rounded-full"
                onClick={() =>
                  handleDemoLogin("nahar@gmail.com", "Nahar@123456")
                }
              >
                User: nahar@gmail.com / Nahar@123456
              </Button>
            </div>
            <Button
              as={Link}
              to="/auth/signup"
              className="rounded-full bg-white text-gray-600 hover:text-white hover:bg-warning-600 transition duration-300 font-bold z-10"
            >
              Signup
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
