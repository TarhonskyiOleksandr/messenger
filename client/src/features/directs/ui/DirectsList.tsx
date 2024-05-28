/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

import DirectItem from "./DirectItem";
import { getAllConversations, selectConversations } from "@/entities/conversations";
import { useAppDispatch, useAppSelector } from "@/shared/store";

const DirectsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectConversations);

  useEffect(() => {
    dispatch(getAllConversations());
  }, [dispatch])

  return (
    <ul className="w-full">
      {
        data?.list.map((conv: any) =>
          <DirectItem
            key={conv.id}
            id={conv.id}
            name={conv.user.userName}
            message={conv.lastMessage?.message}
            time={conv.lastMessage?.createdAt}
          />
        )
      }
    </ul>
  );
};

export default DirectsList;
