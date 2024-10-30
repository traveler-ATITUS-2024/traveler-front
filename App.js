import AppRoutes from "./src/routes/AppRoutes";
import { AuthProvider } from "./src/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-get-random-values";
import Home from "./src/pages/app/Home"

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        {/* <AppRoutes /> */}
        <Home />
      </AuthProvider>
    </NavigationContainer>
  );
}
