/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { selectConversations, selectLastMessage } from "@/entities/conversations";
import { getConversation, readMessage } from "@/entities/conversations/models/thunks";
import { selectMe } from "@/entities/me";
import { selectWS } from "@/entities/websocket";
import { Message } from "@/features/Message";
import { SendMessageBar } from "@/features/sendMessage";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export const Conversation = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data } = useAppSelector(selectConversations);
  const { data: me } = useAppSelector(selectMe);
  const lastMessage = useAppSelector(selectLastMessage);
  const ws = useAppSelector(selectWS);
  const listRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(new Set());

  useEffect(() => {
    if (ws) {
      ws.on('message:typing', ({ isTyping }: { isTyping: boolean }) => setIsTyping(isTyping));
      ws.on('message:seen', (payload: any) => {
        if (id !== payload.conversation) return;
        dispatch({ type: 'conversations/read-message/fulfilled', payload });
      });
    }
  }, [ws, dispatch, data.item.messages, id])

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

  useEffect(() => {
    if (visibleMessages.size && data.item.reciever?._id) {
      dispatch(readMessage({
        messages: [...visibleMessages],
        senderId: data.item.reciever._id,
        conversation: id,
      }))
    }
  }, [visibleMessages, me, id, dispatch, data.item.reciever?._id]);

  const handleVisibilityChange = (data: any, isVisible: boolean) => {
    setVisibleMessages(prevState => {
      const state = new Set(prevState);
      isVisible ? state.add(data) : state.delete(data);
      return state;
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className="flex flex-col-reverse flex-grow overflow-auto max-h-[calc(100vh-76px-76px)]"
        ref={listRef}
      >
        <ul className="relative bottom-0 space-y-2 px-4 lg:px-24 py-4">
          {
            data.item?.messages?.map((item: any) =>
              <Message
                key={item._id}
                myId={me._id}
                item={item}
                onVisibilityChange={handleVisibilityChange}
              />
            )
          }
          {
            isTyping ?
              <Message />
              : null
          }
        </ul>
      </div>
      <SendMessageBar receiverId={data.item?.reciever?._id || id} />
    </div>
  );
};
