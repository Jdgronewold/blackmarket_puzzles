import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { AppHeader } from 'Components/AppBar/AppBar';
import { Grommet } from 'grommet';
import { SignUp } from "Components/Authentication/SignUp";
import { SplashPage } from "Components/Splash/splash";
import { theme } from "./Style/theme"

function App() {
  return (
    <Grommet theme={theme} full>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Grommet>
    
  );
}

export default App;
