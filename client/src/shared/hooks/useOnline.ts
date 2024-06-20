/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

import {
  removeUser,
  selectIsOnline,
  selectWS,
} from "@/entities/websocket";
import { useAppDispatch, useAppSelector } from "../store";
import { selectMyId } from "@/entities/me";

export const useOnline = (id: string) => {
  const dispatch = useAppDispatch();
  const ws = useAppSelector(selectWS);
  const isOnline = useAppSelector((state) => selectIsOnline(state, id));
  const myId = useAppSelector(selectMyId);

  useEffect(() => {
    if (id && ws) {
      ws.emit('user:check_status', { userId: myId, sub: id });

      return () => {
        dispatch(removeUser({ userId: myId, sub: id }))
      }
    }
  }, [id, dispatch, ws, myId]);

  return isOnline;
};
