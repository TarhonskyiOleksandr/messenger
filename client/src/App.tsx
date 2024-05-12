import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from './views/Login';
import Registration from "./views/Registration";
import Dashboard from "./views/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
          <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
