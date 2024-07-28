import React from 'react';

type Props = {
  name: string;
  size?: 'sm' | 'lg';
  isOnline?: boolean;
}

const UserAvatar: React.FC<Props> = ({ name, size, isOnline }) => {
  const getSizeClass = () => {
    if (!size || size === 'sm') return 'w-[30px] h-[30px] text-lg';
    if (size === 'lg') return 'w-[120px] h-[120px] text-3xl';
  };

  const showOnlineMark = () => {
    if (!isOnline) return null;
    return (
      <span className="absolute w-2.5 h-2.5 rounded-full bg-violet-500 border-2 border-white bottom-[-2px] right-0" />
    )
  };

  return (
    <div className={`flex relative justify-center items-center rounded-full bg-black py-2 lg:py-0 ${getSizeClass()}`}>
      <p className="text-white uppercase">
        {name?.charAt(0)}
      </p>
      {showOnlineMark()}
    </div>
  );
};

export default UserAvatar;
