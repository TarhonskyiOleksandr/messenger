import { useState, ChangeEvent, FormEvent, FC } from "react";

import { sendMessage } from "@/entities/conversations";
import { useAppDispatch } from "@/shared/store";

const SendMessageBar: FC<{ receiverId: string }> = ({ receiverId='' }) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      dispatch(sendMessage({ message, receiverId }));
      setMessage('');
    }
  };

  return (
    <div className="bg-gray-900 px-12 py-4 min-w-full">
      <form
        className="flex"
        onSubmit={handleSendMessage}
      >
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          value={message}
        />
        <button
          className="btn btn-primary ml-2"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessageBar;
