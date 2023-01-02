import { AuthContextProvider } from "./contexts/AuthContext";
import { Layout } from "./components/shared/Layout";
import { AppRoutes } from "./routes";

import "./styles/main.css";

function App() {
    return (
        <AuthContextProvider>
            <Layout>
                <AppRoutes />
            </Layout>
        </AuthContextProvider>
    );
}

export default App;