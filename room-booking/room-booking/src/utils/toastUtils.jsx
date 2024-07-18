import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type = "default") => {
  let toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    
  };

 
  switch (type) {
    case "success":
      toast.success(message, toastConfig);
      break;
    case "error":
      toast.error(message, toastConfig);
      break;
    case "info":
      toast.info(message, toastConfig);
      break;
    default:
      toast(message, toastConfig);
      break;
  }
};

export const configureToast = () => {
  toast.configure({
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
  });
};
