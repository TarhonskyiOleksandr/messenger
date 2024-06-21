/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectConversations, selectLastMessage } from "@/entities/conversations";
import { getConversation } from "@/entities/conversations/models/thunks";
import { selectMe } from "@/entities/me";
import { selectWS } from "@/entities/websocket";
import { Message } from "@/features/Message";
import { SendMessageBar } from "@/features/sendMessage";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { TypingDots } from "@/shared/ui";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const Conversation = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data } = useAppSelector(selectConversations);
  const { data: me } = useAppSelector(selectMe);
  const lastMessage = useAppSelector(selectLastMessage);
  const ws = useAppSelector(selectWS);
  const listRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (ws) ws.on('message:typing', ({ isTyping }: { isTyping: boolean }) => setIsTyping(isTyping));
  }, [ws])

  useEffect(() => {
    dispatch(getConversation(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
	}, [data.item?.messages, me, lastMessage]);

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex flex-col-reverse flex-grow overflow-auto max-h-[calc(100vh-76px-76px)]"
        ref={listRef}
      >
        <ul className="relative bottom-0 space-y-2 px-24 py-4">
          {
            data.item?.messages?.map((item: any) =>
              <Message
                key={item._id}
                myId={me._id}
                item={item}
              />
            )
          }
          {
            isTyping ?
              <Message />
              : null
          }
        </ul>
        <TypingDots />
      </div>
      <SendMessageBar receiverId={data.item?.reciever?._id || id} />
    </div>
  );
};
