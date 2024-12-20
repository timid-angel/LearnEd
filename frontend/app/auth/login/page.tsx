"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/Images/LearnEd.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ErrorAlert from "@/app/components/core/ErrorAlert";
import { useLoginMutation } from "@/lib/redux/api/getApi";
import Cookie from "js-cookie";
import { useTranslations } from "next-intl";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [login] = useLoginMutation();
  const router = useRouter();
  const t = useTranslations('AuthLogin');

  const errorMessageNull = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = { email: email, password: password };

    try {
      let result = await login(data);
      if (result.data?.token) {
        // localStorage.setItem("token", result.data.token);
        // localStorage.setItem("role", result.data.role);
        Cookie.set("token", result.data.token);
        Cookie.set("role", result.data.role);
        router.push(`/`);
      } else {
        setErrorMessage("Invalid Information");
        errorMessageNull();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image src={logo} className=" w-32 py-4" alt="logo"></Image>
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {t("Sign in to your account")}
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("Your email")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("Password")}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  minLength={8}
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      {t("Remember me")}
                    </label>
                  </div>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {t("Forgot password?")}
                </Link>
              </div>
              <button
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleSubmit(e)
                }
              >
                {t("Sign in")}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t("Don’t have an account yet?")}{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  {t("Sign up")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
