import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import moment from "moment";

const ProfilePage = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <div>ProfilePage</div>
      {isCheckingAuth ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        authUser && (
          <div>
            <h1>{authUser.fullName}</h1>
            <h1>{moment.isMoment(authUser.createdAt)}</h1>
          </div>
        )
      )}
    </>
  );
};

export default ProfilePage;
