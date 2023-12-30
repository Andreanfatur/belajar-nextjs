import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";

const RegisterView = () => {
  const { push } = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState("");
  const handSubmit = async (event: any) => {
    event.preventDefault();
    setisError("");
    setisLoading(true);
    const data = {
      email: event.target.email.value,
      name: event.target.name.value,
      password: event.target.password.value,
    };
    const result = await fetch("/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      event.target.reset();
      setisLoading(false);
      push("/auth/login");
    } else {
      setisLoading(false);
      setisError(result.status === 400 ? "Email already exists" : "");
    }
  };
  return (
    <div className={styles.register}>
      <h2 className={styles.register__title}>Register Page</h2>
      {isError && <p className={styles.register__error}>{isError}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handSubmit}>
          <div className={styles.register__form__item}>
            <label
              htmlFor="email"
              className={styles.register__form__item__label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="name"
              className={styles.register__form__item__label}
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              placeholder="name"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="password"
              className={styles.register__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className={styles.register__form__item__input}
            />
          </div>
          <button type="submit" className={styles.register__form__item__button}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p>
        have an account{" "}
        <Link href="/auth/login" className={styles.register__link}>
          Sing in
        </Link>
      </p>
    </div>
  );
};
export default RegisterView;
