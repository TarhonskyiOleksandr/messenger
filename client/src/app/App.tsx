import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";

import { Login } from '@/pages/login';
import { Registration } from '@/pages/registration';
import { Main } from '@/pages/main';
import { Settings } from '@/pages/settings';
import HomeLayout from "./layouts/HomeLayout";
import store from "./store";
import { Notifications } from '@/shared/ui';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
      <Notifications />
    </Provider>
  );
};

export default App;
