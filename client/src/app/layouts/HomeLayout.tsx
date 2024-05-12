import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { api } from '../../shared/api';
import Navbar from './components/Navbar';

const HomeLayout: React.FC = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/user/me')
      .then(({ data }) => setData(data))
      .catch((err) => {
        if (err.response.status === 401) navigate('/login');
      });
  }, [navigate]);
  console.log(data)
  return (
    <div>
      <Navbar />
      <main>
        {/* <pre className="bg-gray-800 p-4 rounded-sm overflow-x-auto m-12">
          <code className="text-green-400">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre> */}
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
