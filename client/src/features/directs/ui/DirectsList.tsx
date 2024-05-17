/* eslint-disable @typescript-eslint/no-explicit-any */
import DirectItem from "./DirectItem";

const DATA = [
  {
    name: 'John',
    message: 'Hey!',
  },
  {
    name: 'Mary',
    message: 'Hello!',
  },
  {
    name: 'Alisa',
    message: 'Great! Thanks',
  },
  {
    name: 'Albert',
    message: 'Hi there',
  },
];

const DirectsList = () => {
  return (
    <ul className="w-full">
      {
        DATA.map(({ name, message }: any) =>
          <DirectItem
            key={name}
            name={name}
            message={message}
          />
        )
      }
    </ul>
  );
};

export default DirectsList;
