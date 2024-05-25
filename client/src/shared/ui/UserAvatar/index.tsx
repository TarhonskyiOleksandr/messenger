import React from 'react';

type Props = {
  name: string;
  size?: 'sm' | 'lg';
}

const UserAvatar: React.FC<Props> = ({ name, size }) => {
  const getSizeClass = () => {
    if (!size || size === 'sm') return 'w-[30px] h-[30px] text-lg';
    if (size === 'lg') return 'w-[120px] h-[120px] text-3xl';
  };

  return (
    <div className={`flex justify-center items-center rounded-full bg-black ${getSizeClass()}`}>
      <p className="text-white uppercase">
        {name?.charAt(0)}
      </p>
    </div>
  );
};

export default UserAvatar;
