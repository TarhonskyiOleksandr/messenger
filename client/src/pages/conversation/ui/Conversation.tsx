/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectConversations } from "@/entities/conversations";
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
  const lastMessageRef = useRef<HTMLLIElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getConversation(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'auto',
      });
    }
	}, [data.item?.messages]);

  if (loading) return null;

  return (
    <div className="flex flex-col">
      <div
        className="h-[calc(100vh-76px-76px)] overflow-auto"
        ref={listRef}
      >
        <ul className="flex flex-col justify-end gap-2 py-5 px-6">
          {
            data.item?.messages?.map((item: any) =>
              <li
                key={item._id}
                ref={lastMessageRef}
                className={`transition-height flex h-fit w-full ${item.senderId === me._id ? 'justify-end' : '' }`}
              >
                <div className="block px-4 py-3 bg-slate-200 rounded-md h-fit w-[40%]">
                  <p className="text-gray-800 text-lg">
                    {item.message}
                  </p>
                </div>
              </li>
            )
          }
        </ul>
      </div>
      <SendMessageBar receiverId={data.item?.participants?.[1]} />
    </div>
  );
};
