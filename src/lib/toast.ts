import { toast } from "sonner";

const SUCCESS_DURATION = 3000;
const INFO_DURATION = 4000;
const WARNING_DURATION = 5000;
const ERROR_DURATION = 6000;

export function showSuccessToast(message: string) {
  toast.success(message, {
    duration: SUCCESS_DURATION,
  });
}

export function showInfoToast(message: string) {
  toast.info(message, {
    duration: INFO_DURATION,
  });
}

export function showWarningToast(message: string) {
  toast.warning(message, {
    duration: WARNING_DURATION,
  });
}

export function showErrorToast(message: string) {
  toast.error(message, {
    duration: ERROR_DURATION,
  });
}
