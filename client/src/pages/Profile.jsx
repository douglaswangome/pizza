import "./Profile.css";
import Header from "../components/Header/Header";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { signUserOut } from "../table/slice";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/notify";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.table.user);

  const handleDeleteAccount = () => {
    // reauthenticateWithCredential
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(signUserOut());
        navigate("/");
      })
      .catch((err) => notify(500, "Error signing out."));
  };

  return (
    <div>
      <Header />
      <div className="user-profile">
        {user === null ? (
          <>
            <div className="loader"></div>
            <span>Loading..</span>
          </>
        ) : (
          <>
            <div className="name">
              <div className="avatar">
                <span>{user.name[0]}</span>
                <span>{user.name.split(" ")[1][0]}</span>
              </div>
              <div>
                <span>Name: </span>
                <input value={user.name} onChange={null} readOnly type="text" />
              </div>
              <div>
                <span>Email: </span>
                <input
                  value={user.email.address}
                  onChange={null}
                  readOnly
                  type="email"
                />
                <span className="verified">
                  {user.email.verfied ? (
                    <>
                      <BsCheckCircle />
                      Email Verified
                    </>
                  ) : (
                    <>
                      <BsXCircle />
                      Email Not Verified.
                      <span>Verify here.</span>
                    </>
                  )}
                </span>
              </div>
              <div>
                <span>Phone: </span>
                <input
                  value={`+254${user.phone}`}
                  onChange={null}
                  readOnly
                  type="tel"
                />
              </div>
            </div>
            <button onClick={handleSignOut}>
              <span>Sign Out</span>
            </button>
            <hr className="h-line" />
            <button className="delete">
              <span>Delete Account</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
