/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toast, useToaster } from 'react-hot-toast/headless';

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, updateHeight } = handlers;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2"
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast: Toast) => {
        const ref = (el: any) => {
          if (el && typeof toast.height !== "number") {
            const height = el.getBoundingClientRect().height;
            updateHeight(toast.id, height);
          }
        };
        return (
          <div
            key={toast.id}
            ref={ref}
            className="rounded-md p-4 bg-gray-700 flex items-center"
            style={toast?.style || {}}
            {...toast.ariaProps}
          >
            {
              toast?.icon ?
              <div className='mr-1.5'>
                {toast.icon}
              </div> : null
            }
            <p className="text-white text-lg">
              {toast?.message as string}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
