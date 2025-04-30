import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import GamePage from "./pages/GamePage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
   return (
      <ThemeProvider theme={theme}>
         <GlobalStyles />
         <Router>
            <Layout>
               <Routes>
                  <Route path='/' element={<LandingPage />} />
                  <Route path='/login' element={<AuthPage />} />
                  <Route path='/signup' element={<AuthPage />} />
                  <Route path='/game' element={<GamePage />} />
                  <Route path='/dashboard' element={<DashboardPage />} />
                  <Route path='*' element={<NotFoundPage />} />
               </Routes>
            </Layout>
         </Router>
      </ThemeProvider>
   );
}

export default App;
