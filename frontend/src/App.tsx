import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/header.js";
import { BrowsePage } from "./pages/browse-page.js";
import { LoginPage } from "./pages/login-page.js";
import { SettingsPage } from "./pages/settings-page.js";
import { WatchlistPage } from "./pages/watchlist-page.js";
import { useAuth } from "./use-auth.js";
import { useWatchlist } from "./use-watchlist.js";
import theme from "./theme.module.css";

function App() {
  const auth = useAuth();
  const watchlist = useWatchlist(auth.user?.id);

  if (!auth.user) {
    return (
      <div className={theme.app}>
        <LoginPage auth={auth} />
      </div>
    );
  }

  return (
    <div className={theme.app}>
      <BrowserRouter>
        <Header user={auth.user} onLogout={auth.logout} />
        <Routes>
          <Route path="/" element={<BrowsePage watchlist={watchlist} />} />
          <Route
            path="/watchlist"
            element={<WatchlistPage watchlist={watchlist} />}
          />
          <Route path="/settings" element={<SettingsPage auth={auth} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
