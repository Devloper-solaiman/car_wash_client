/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Checkbox } from '@nextui-org/react';
import { FC } from 'react';
import {
  IoMdLock,
  IoMdMail,
  IoMdPerson,
  IoMdCall,
  IoMdPin,
} from 'react-icons/io';
import CWForm from '../../components/form/CWForm';
import CWInput from '../../components/form/CWInput';
import { useSignUpMutation } from '../../redux/features/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Container from '../../components/ui/Container'; // Import Container for consistent layout
import Logo from '../../components/ui/Logo';
import BackButton from '../../components/serviceSlots/BackButton';

type TSignUpFormValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

const SignUp: FC = () => {
  const [signupUser] = useSignUpMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: TSignUpFormValues) => {
    const toastId = toast.loading('Registering...');

    const userData = {
      ...data,
      role: 'user',
    };

    try {
      const res = await signupUser(userData).unwrap();

      if (res?.success) {
        toast.success('Successfully registered, please log in now', {
          id: toastId,
          duration: 3000,
        });
        navigate('/auth/login');
      } else {
        toast.dismiss(toastId);
      }
    } catch (err) {
      toast.dismiss(toastId);
    }
  };

  return (
    <Container>
      <div className="h-screen flex flex-col justify-center">
        <BackButton />
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-center">
          <div
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1722797709475-2fbd19f27948?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="relative flex flex-col items-center justify-center w-full md:max-w-md h-[420px] bg-warning rounded-l-md p-4 overflow-hidden"
          >
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            {/* Content above the overlay */}
            <h3 className="text-white text-2xl font-semibold mb-4 z-10">
              Make Shine Your Car
            </h3>
            <Button
              as={Link}
              to="/auth/login"
              className="z-10 rounded-full bg-white text-gray-600 hover:text-white hover:bg-warning-600 transition duration-300 font-bold"
            >
              Log in
            </Button>
          </div>

          <div className="w-full h-full md:h-[420px] bg-white rounded-r-md p-2 md:p-6">
            <CWForm<TSignUpFormValues> onSubmit={onSubmit}>
              <div className="flex flex-col items-start justify-start">
                {' '}
                <Logo />
              </div>
              <h2 className="text-2xl font-bold text-warning flex flex-col items-center justify-center">
                Sign Up
              </h2>
              <div
                className={`flex flex-col items-center justify-center gap-5 rounded-md p-5 w-full`}
              >
                <div className="flex items-center gap-3 w-full flex-col md:flex-row">
                  <CWInput
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    required={true}
                    icon={<IoMdPerson className="text-2xl text-warning" />}
                  />
                  <CWInput
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    required={true}
                    type="email"
                    icon={<IoMdMail className="text-2xl text-warning" />}
                  />
                </div>
                <div className="flex items-center gap-3 w-full flex-col md:flex-row">
                  <CWInput
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    required={true}
                    type="password"
                    icon={<IoMdLock className="text-2xl text-warning" />}
                  />
                  <CWInput
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    type="tel"
                    required={true}
                    icon={<IoMdCall className="text-2xl text-warning" />}
                  />
                </div>
                <div className="w-full">
                  <CWInput
                    name="address"
                    label="Address"
                    type="text"
                    placeholder="Enter your address"
                    icon={
                      <IoMdPin className="text-2xl text-warning pointer-events-none flex-shrink-0" />
                    }
                    required
                  />
                </div>

                <div className="flex py-2 justify-between w-full">
                  <Checkbox
                    classNames={{
                      label: 'text-small',
                    }}
                    color="warning"
                  >
                    I agree to the terms and conditions
                  </Checkbox>
                  <Button
                    className="text-white"
                    radius="full"
                    color="warning"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </CWForm>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
