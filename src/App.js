
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    // 2) Provider (sarmalama)
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
};

export default App;
