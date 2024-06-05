import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchMe, selectMe } from "@/entities/me";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import {
  connectWs,
  disconnect,
} from "@/entities/websocket";

export const useHomeLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, data } = useAppSelector(selectMe);

  useEffect(() => {
    dispatch(fetchMe());
  }, [navigate, dispatch]);

  useEffect(() => {
    if (data._id) {
      dispatch(connectWs(data._id));

      return () => {
        dispatch(disconnect());
      };
    }
  }, [data, dispatch]);

  if (error?.status === 401) navigate('/login');
};
