import { FC } from 'react';
import { Outlet } from 'react-router-dom';

type TAuthProps = object;

const Auth: FC<TAuthProps> = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Blurred Background Layer */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-400"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1079059906/photo/side-of-car-washed-in-self-serve-carwash-strokes-from-brush-in-white-shampoo-visible-on.jpg?s=612x612&w=0&k=20&c=nXRwhFnVuqvYHB7jancoJNE-dU1kDWC7Or22ePETWVE=')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          filter: 'blur(20px)', // Adjust the blur amount as needed
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
