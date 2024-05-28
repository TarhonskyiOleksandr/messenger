import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import { fetchMe, selectMe } from "@/entities/me";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export const useHomeLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, error } = useAppSelector(selectMe);

  useEffect(() => {
    dispatch(fetchMe());
  }, [navigate, dispatch]);

  useEffect(() => {
    if (data._id) {
      const socket = io(import.meta.env.VITE_API_URL, {
        query: {
          userId: data._id,
        }
      });
      socket.on("getUsersOnline", (users) => console.log(users))
      return () => {
        socket.close();
      }
    }
  }, [data]);

  if (error?.status === 401) navigate('/login');
};
