import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import { fetchMe } from '@/entities/me';
import { useAppDispatch } from '@/shared/store';
import { AxiosError } from 'axios';
import Sidebar from './components/Sidebar';

const HomeLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe())
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) navigate('/login');
      });
  }, [navigate, dispatch]);

  return (
    <div>
      <Navbar />
      <main className='h-[calc(100vh-76px)] grid grid-cols-[3fr_9fr]'>
        <Sidebar />
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
