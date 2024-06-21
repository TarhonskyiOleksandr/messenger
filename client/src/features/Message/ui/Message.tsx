import { FC } from "react";

import { IMessage } from "@/app/type";
import { TypingDots } from "@/shared/ui";

interface IMessageProps {
  item?: IMessage;
  myId?: string;
}

export const Message: FC<IMessageProps> = ({ item, myId }) => {
  const formatTime = (value: string) => {
    const date: Date = new Date(value);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const getMessageStyles = (isWrapper: boolean) => {
    const baseWrap = 'transition-height flex h-fit w-full';
    const baseContent = 'px-6 py-3 rounded-3xl h-fit w-fit';
    const isMyMessage = item?.senderId === myId;
    if ((!isWrapper && !item) || (!isWrapper && !isMyMessage)) return baseContent + ' bg-slate-600';
    if (!isWrapper && isMyMessage) return baseContent + ' bg-blue-600';
    if (isWrapper && !item) return baseWrap;
    if (isWrapper && isMyMessage) return baseWrap + ' justify-end';
    return baseWrap;
  }

  if (!item) return(
    <li className={getMessageStyles(true)}>
      <div className={getMessageStyles(false)}>
        <TypingDots />
      </div>
    </li>
  );

  return (
    <li className={getMessageStyles(true)}>
      <div className={getMessageStyles(false)}>
        <p className="text-gray-100 text-lg">
          {item?.message}
        </p>
        <p className={`text-gray-400 text-xs flex justify-${item?.senderId === myId ? 'end' : 'start'}`}>
          {formatTime(item?.createdAt || '')}
        </p>
      </div>
    </li>
  );
};
