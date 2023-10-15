import "./App.css";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import routes, { api } from "./routes/routes";
import { custom } from "./utils/notify";
import { useDispatch } from "react-redux";
import { signIn, signUserOut } from "./table/slice";
import { auth } from "./utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const autoSignOut = () => {
      setTimeout(() => {
        signOut(auth);
      }, 1000 * 60 * 60 * 4);
    };

    const unsubscribe = onAuthStateChanged(auth, async (userCred) => {
      if (userCred) {
        let client = {
          _id: "",
          name: "",
          email: {
            address: userCred.email,
            verified: userCred.emailVerified,
          },
          phone: "",
          role: "",
          pending: { amount: 0, avail: false },
        };
        try {
          const response = await api.get(
            `/users/fetch?email=${client.email.address}`
          );
          const { _id, name, phone, role, pending } = response.data.client;
          client = { ...client, _id, name, phone, role, pending };

          dispatch(signIn(client));
          autoSignOut();
        } catch (error) {
          dispatch(signUserOut());
          console.log(error);
        }
      } else {
        dispatch(signUserOut());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="app">
      {custom}
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
