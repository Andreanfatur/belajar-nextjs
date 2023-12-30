import { url } from "inspector";
import style from "./navbar.module.css";
import { signIn, useSession, signOut } from "next-auth/react";
const Navbar = () => {
  const { data }: any = useSession();
  return (
    <div className={style.navbar}>
      <h2 className="big">navbar</h2>
      <div className={style.profile}>
        <div className={style.avatar}>
          {data ? (
            <img
              src={data.user.image}
              alt={data.user.image}
              className={style.avatar}
            />
          ) : (
            ""
          )}
        </div>
        {data && data.user.name}

        {data ? (
          <button className={style.button} onClick={() => signOut()}>
            sign out
          </button>
        ) : (
          <button className={style.button} onClick={() => signIn()}>
            sign in
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
