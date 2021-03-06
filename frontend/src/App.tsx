import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppHeader } from "Components/AppBar/AppBar";
import AxiosInterceptors from "Components/Axios/AxiosInterceptors";
import { CreatePuzzle } from "Components/Puzzle/CreatePuzzle";
import { Grommet } from "grommet";
import { Home } from "Components/Home/Home";
import { Login } from "Components/Authentication/Login";
import { MissingPage } from "Components/404/404Page";
import { ProtectedRoute } from "Components/Routes/ProtectedRoute";
import { Provider } from 'react-redux'
import { SignUp } from "Components/Authentication/SignUp";
import { SplashPage } from "Components/Splash/splash";
import { UnProtectedRoute } from "Components/Routes/UnProtectedRoute";
import store from './State/store'
import { theme } from "./Style/theme";

function App() {
  return (
    <Provider store={store}>
      <Grommet theme={theme} full>
        <AxiosInterceptors>
          <AppHeader />
          <BrowserRouter>
            <Routes>
              
              <Route element={<UnProtectedRoute />}>
                <Route index element={<SplashPage />} />
                <Route path="/splash" element={<SplashPage />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />}/>
                <Route path="/create-puzzle" element={<CreatePuzzle />}/>
              </Route>
              <Route path="*" element={<MissingPage />} />
            </Routes>
          </BrowserRouter>
        </AxiosInterceptors>
      </Grommet>
    </Provider>
    
  );
}

export default App;
