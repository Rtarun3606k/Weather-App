import React from "react";
import { toast } from "react-toastify";

import { useEffect } from "react";

const ToastCoustome = ({ message, sucess }) => {
  const notify = () => {
    if (sucess) {
      toast.success(message);
    }
    if (!sucess) {
      toast.error(message);
    }
  };

  return notify();
};

export default ToastCoustome;
