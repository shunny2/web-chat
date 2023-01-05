import { AuthContextProvider } from "./contexts/AuthContext";
import { Layout } from "./components/shared/Layout";
import { AppRoutes } from "./routes";

import "./styles/main.css";
import SocketsProvider from "./contexts/SocketContext";

function App() {
    return (
        <AuthContextProvider>
            <SocketsProvider>
                <Layout>
                    <AppRoutes />
                </Layout>
            </SocketsProvider>
        </AuthContextProvider>
    );
}

export default App;