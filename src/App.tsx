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
import HowToPlayPage from "./pages/HowToPlayPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import SupportPage from "./pages/SupportPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import LegalPage from "./pages/LegalPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import ResponsibleGamingPage from "./pages/ResponsibleGamingPage";
import LicensesPage from "./pages/LicensesPage";

function App() {
   return (
      <ThemeProvider theme={theme}>
         <GlobalStyles />
         <Router>
            <Layout>
               <Routes>
                  {/* Main Pages */}
                  <Route path='/' element={<LandingPage />} />
                  <Route path='/login' element={<AuthPage />} />
                  <Route path='/signup' element={<AuthPage />} />
                  <Route path='/game' element={<GamePage />} />
                  <Route path='/dashboard' element={<DashboardPage />} />

                  {/* Information Pages */}
                  <Route path='/how-to-play' element={<HowToPlayPage />} />
                  <Route path='/leaderboard' element={<LeaderboardPage />} />
                  <Route path='/support' element={<SupportPage />} />
                  <Route path='/faq' element={<FAQPage />} />
                  <Route path='/contact' element={<ContactPage />} />

                  {/* Legal Pages */}
                  <Route path='/terms-of-service' element={<TermsOfServicePage />} />
                  <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
                  <Route path='/legal' element={<LegalPage />} />
                  <Route path='/terms-and-conditions' element={<TermsConditionsPage />} />
                  <Route path='/responsible-gaming' element={<ResponsibleGamingPage />} />
                  <Route path='/licenses' element={<LicensesPage />} />

                  {/* 404 Page */}
                  <Route path='*' element={<NotFoundPage />} />
               </Routes>
            </Layout>
         </Router>
      </ThemeProvider>
   );
}

export default App;
