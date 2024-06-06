import { useState, ChangeEvent, FormEvent, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Send } from "iconsax-react";

import { sendMessage } from "@/entities/conversations";
import { useAppDispatch } from "@/shared/store";

const SendMessageBar: FC<{ receiverId: string }> = ({ receiverId='' }) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSendMessage = async(e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const { payload } = await dispatch(sendMessage({ message, receiverId }));
      setMessage('');
      console.log(payload)
      if (receiverId === id) navigate(`/directs/${payload.conversationId}`);
    }
  };

  return (
    <div className="bg-gray-900 px-24 py-4 min-w-full">
      <form
        className="flex"
        onSubmit={handleSendMessage}
      >
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          value={message}
        />
        <button
          className="btn btn-primary ml-2 rounded-full p-2"
          type="submit"
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
