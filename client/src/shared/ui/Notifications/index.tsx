/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toast, useToaster } from 'react-hot-toast/headless';

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, updateHeight } = handlers;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        zIndex: 999
      }}
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
            className='notification'
            style={{
              background: 'rgb(37, 35, 35)',
              ...(toast?.style || {})
            }}
            {...toast.ariaProps}
          >
            {
              toast?.icon ?
              <div className='mr-2'>
                {toast.icon}
              </div> : null
            }
            <p className="text-white text-sm">
              {toast?.message as string}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
