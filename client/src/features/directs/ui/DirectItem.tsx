/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserAvatar } from "@/shared/ui";

interface IDirectProps {
  name: string;
  message: string;
}

const DirectItem: React.FC<IDirectProps> = ({ name, message }) => {
  console.log(name, message)
  return (
    <li className="w-full flex items-center py-3 px-5 bg-transparent hover:bg-slate-500 rounded-lg cursor-pointer">
      <UserAvatar name={name} />
      <div className="flex flex-col justify-between ml-2">
        <p className="text-white font-medium text-lg">
          {name}
        </p>
        <p className="text-gray-300">
          {message}
        </p>
      </div>
    </li>
  );
};

export default DirectItem;
