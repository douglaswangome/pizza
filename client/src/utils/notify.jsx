import toast, { Toaster } from "react-hot-toast";

const notify = (status, message) => {
  if (status === 200) {
    toast.success(message);
  } else if (status === "") {
    toast(message);
  } else {
    toast.error(message);
  }
};

const custom = (
  <Toaster
    toastOptions={{
      style: {
        background: "#212121",
        color: "#FFF",
        border: "1px solid #424242",
        boxShadow: "0 0 12px #424242",
      },
    }}
  />
);

export { notify, custom };
