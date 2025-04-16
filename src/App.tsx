import { FC, useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useRouter } from "./hooks/useRoutes";
import ScrollButton from "./components/WebsiteReview/ScrollButton";
import Loader from "./components/Loader/Loader";

type TAppProps = object;

const App: FC<TAppProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout as needed

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RouterProvider router={router} />
          <ScrollButton />
        </>
      )}
    </main>
  );
};

export default App;
