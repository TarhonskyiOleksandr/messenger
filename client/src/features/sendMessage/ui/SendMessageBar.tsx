import { useState, ChangeEvent, FormEvent, FC, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Send } from "iconsax-react";

import { sendMessage } from "@/entities/conversations";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { selectIsOnline, selectWS } from "@/entities/websocket";

const SendMessageBar: FC<{ receiverId: string }> = ({ receiverId='' }) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const ws = useAppSelector(selectWS);
  const isOnline = useAppSelector((state) => selectIsOnline(state, receiverId));
  const isTyping = useRef(false);
  const typingTimeout = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSendMessage = async(e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsLoading(true);
      const { payload } = await dispatch(sendMessage({ message, receiverId }));
      setMessage('');
      ws.emit('message:typing', { id: receiverId, isTyping: false });
      setIsLoading(false);
      if (receiverId === id) navigate(`/directs/${payload.conversationId}`);
    }
  };

  const detectTypingStart = () => {
    if (!isTyping.current) {
      isTyping.current = true;
      ws.emit('message:typing', { id: receiverId, isTyping: true });
    }
  };

  const detectTypingEnd = () => {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      isTyping.current = false;
      ws.emit('message:typing', { id: receiverId, isTyping: false });
    }, 1500);
  };

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (isOnline) {
      detectTypingStart();
      detectTypingEnd();
    }
  };

  return (
    <div className="bg-gray-900 px-3 md:px-24 py-4 min-w-full">
      <form
        className="flex"
        onSubmit={handleSendMessage}
      >
        <input
          onChange={handleChangeMessage}
          value={message}
        />
        <button
          className="btn btn-primary ml-2 rounded-full p-2"
          type="submit"
          disabled={isLoading}
        >
          <Send
            size="24"
            color="#FFF"
            className="ml-1"
          />
        </button>
      </form>
    </div>
  );
};

export default SendMessageBar;
