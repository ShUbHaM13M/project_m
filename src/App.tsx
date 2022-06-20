import { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useNetwork from "./hooks/useNetwork";
import AppRoutes from "./pages/Routes"

function App() {
  const [backOnline, setBackOnline] = useState(false);
  const { isOnline } = useNetwork();

  useEffect(() => {
    if (isOnline && backOnline) toast.info("Back Online !");
    if (!isOnline)
      toast.error("You are Offline !", {
        autoClose: false,
        onOpen: () => setBackOnline(true),
      });
  }, [isOnline]);

  return (
    <div className="flex justify-center items-start sm:items-center min-h-screen">
      <Router>
        <Suspense fallback={<Loading />}>
          <AppRoutes />
        </Suspense>
      </Router>
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
}

const Loading = ({isLoading: boolean}) => {
  return <h1>Loading...</h1>;
};

export default App;
