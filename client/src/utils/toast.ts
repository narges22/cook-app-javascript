import { RefObject } from "react";

export const showSuccess = (toast: RefObject<any>, message: string) => {
  if (!toast.current) return;
  toast.current.show({
    severity: "success",
    summary: "Success",
    detail: message,
    life: 3000,
  });
};
