/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectConversations, selectLastMessage } from "@/entities/conversations";
import { getConversation } from "@/entities/conversations/models/thunks";
import { selectMe } from "@/entities/me";
import { SendMessageBar } from "@/features/sendMessage";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export const Conversation = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data, loading } = useAppSelector(selectConversations);
  const { data: me } = useAppSelector(selectMe);
  const lastMessage = useAppSelector(selectLastMessage);
  const lastMessageRef = useRef<HTMLLIElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getConversation(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    if (listRef.current && lastMessage?.senderId === me._id) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
	}, [data.item?.messages, me, lastMessage]);

  const formatTime = (value: string) => {
    const date: Date = new Date(value);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  if (loading) return null;

  return (
    <div className="flex flex-col">
      <div
        className="h-[calc(100vh-76px-76px)] overflow-auto"
        ref={listRef}
      >
        <ul className="flex flex-col justify-end gap-2 py-5 px-24">
          {
            data.item?.messages?.map((item: any) =>
              <li
                key={item._id}
                ref={lastMessageRef}
                className={`transition-height flex h-fit w-full ${item.senderId === me._id ? 'justify-end' : '' }`}
              >
                <div className={`px-6 py-3 rounded-3xl h-fit w-fit ${item.senderId === me._id ? 'bg-blue-600' : 'bg-slate-600'}`}>
                  <p className="text-gray-100 text-lg">
                    {item.message}
                  </p>
                  <p className={`text-gray-400 text-xs flex justify-${item.senderId === me._id ? 'end' : 'start'}`}>
                    {formatTime(item.createdAt)}
                  </p>
                </div>
              </li>
            )
          }
        </ul>
      </div>
      <SendMessageBar receiverId={data.item?.reciever?._id} />
    </div>
  );
};
