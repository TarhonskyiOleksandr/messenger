import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Login } from '@/pages/login';
import { Registration } from '@/pages/registration';
import { Main } from '@/pages/main';
import HomeLayout from "./layouts/HomeLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Main />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
