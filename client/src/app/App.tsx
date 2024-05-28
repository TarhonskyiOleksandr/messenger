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
import { Conversation } from '@/pages/conversation';
import { HomeLayout, AuthLayout } from "./layouts/ui";
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
            <Route path="/directs/:id" element={<Conversation />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Notifications />
    </Provider>
  );
};

export default App;
