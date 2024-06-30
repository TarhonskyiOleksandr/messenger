/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useLayoutEffect } from "react";
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
  const { error, data, loading } = useAppSelector(selectMe);

  useEffect(() => {
    if (!data._id) dispatch(fetchMe());
  }, [navigate, dispatch, data]);

  useEffect(() => {
    if (data._id) {
      dispatch(connectWs(data._id));

      return () => {
        dispatch(disconnect());
      };
    }
  }, [data, dispatch]);

  useLayoutEffect(() => {
    if (error && !data._id) navigate('/login');
  }, [error, navigate, data]);

  return { isLoading: loading };
};
