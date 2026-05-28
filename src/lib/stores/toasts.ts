import type { Toast } from '$lib/types/notification';

function createToasts() {
  let toasts = $state<Toast[]>([]);

  function dismiss(id: string) {
    toasts = toasts.filter(t => t.id !== id);
  }

  function push(toast: Omit<Toast, 'id'>) {
    const id = crypto.randomUUID();
    const duration = toast.duration ?? 3000;
    const newToast: Toast = { id, ...toast, duration };
    toasts = [...toasts, newToast];

    let timeout: ReturnType<typeof setTimeout>;
    let paused = false;
    let remaining = duration;

    const startTimer = () => {
      timeout = setTimeout(() => {
        if (!paused) dismiss(id);
      }, remaining);
      
      const interval = setInterval(() => {
        if (!paused) {
          remaining -= 100;
          if (remaining <= 0) {
            clearInterval(interval);
          }
        }
      }, 100);
    };

    startTimer();

    return id;
  }

  return {
    get list() { return toasts; },
    push,
    dismiss,
  };
}

export const toasts = createToasts();