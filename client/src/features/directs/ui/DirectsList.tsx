/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { DirectItem } from "@/shared/ui";
import { getAllConversations, selectConversations } from "@/entities/conversations";
import { useAppDispatch, useAppSelector } from "@/shared/store";

interface IDirects {
  isSearch?: boolean;
}

const DirectsList: React.FC<IDirects> = ({ isSearch }) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectConversations);
  const { id }= useParams();

  useEffect(() => {
    dispatch(getAllConversations());
  }, [dispatch])

  return (
    <ul className={`flex flex-col gap-2 min-w-full ${isSearch ? 'hidden' : 'block'}`}>
      {
        data?.list.map((conv: any) =>
          <DirectItem
            key={conv.id}
            id={conv.id}
            name={conv.user.userName}
            message={conv.lastMessage?.message}
            time={conv.lastMessage?.createdAt}
            isActive={id === conv.id}
          />
        )
      }
    </ul>
  );
};

export default DirectsList;
