
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    // 2) Provider (sarmalama)
    <AuthContextProvider>
      <AppRouter />
      <ToastContainer />
    </AuthContextProvider>
  );
};

export default App;
