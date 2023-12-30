import Link from "next/link";
import styles from "./login.module.scss";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState("");
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/product";
  const handSubmit = async (event: any) => {
    event.preventDefault();
    setisError("");
    setisLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setisLoading(false);
        push(callbackUrl);
      } else {
        setisLoading(false);
        setisError("Email or Passwort is incorrect");
      }
    } catch (error: any) {
      setisLoading(false);
      setisError("Email or Passwort is incorrect");
    }
  };
  return (
    <div className={styles.login}>
      <h2 className={styles.login__title}>login Page</h2>
      {isError && <p className={styles.login__error}>{isError}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handSubmit}>
          <div className={styles.login__form__item}>
            <label htmlFor="email" className={styles.login__form__item__label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className={styles.login__form__item__input}
            />
          </div>
          <div className={styles.login__form__item}>
            <label
              htmlFor="password"
              className={styles.login__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className={styles.login__form__item__input}
            />
          </div>
          <button type="submit" className={styles.login__form__item__button}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <button
          onClick={() =>
            signIn("google", {
              redirect: false,
              callbackUrl,
            })
          }
          className={styles.login__form__item__google}
        >
          Sign In With Google
        </button>
      </div>
      <p>
        dont have an account{" "}
        <Link href="/auth/register" className={styles.login__link}>
          Register
        </Link>
      </p>
    </div>
  );
};
export default LoginView;
