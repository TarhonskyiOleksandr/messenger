import React from 'react';

type Props = {
  name: string;
}

const UserAvatar: React.FC<Props> = ({ name }) => {
  return (
    <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-black">
      <p className="text-white text-lg uppercase">
        {name?.charAt(0)}
      </p>
    </div>
  );
};

export default UserAvatar;
