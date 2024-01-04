"use client";

import { useState, ChangeEvent, useRef, useEffect, FormEvent, RefObject, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import axios from "axios";
import clsx from "clsx";

import { DAYS, MONTHS, YEARS } from "@/common/constans/dates";

import AuthLayout from "@/common/components/layouts/auth/AuthLayout";
import LoadingFlashing from "@/common/components/elements/LoadingFlashing";

const RegisterPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [emailValue, setEmailValue] = useState<string>("");
  const [emailErrorValue, setEmailErrorValue] = useState<string>("");
  const [emailRequired, setEmailRequired] = useState<boolean>(false);

  const [displayNameValue, setDisplayNameValue] = useState<string>("");
  const [isDisplayNameFocused, setIsDisplayNameFocused] = useState<boolean>(false);

  const [usernameValue, setUsernameValue] = useState<string>("");
  const [usernameErrorValue, setUsernameErrorValue] = useState<string>("");
  const [usernameSuccessValue, setUsernameSuccessValue] = useState<string>("");
  const [isUsernameFocused, setIsUsernameFocused] = useState<boolean>(false);
  const [usernameRequired, setUsernameRequired] = useState<boolean>(false);

  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordErrorValue, setPasswordErrorValue] = useState<string>("");
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false);

  const [birthRequired, setBirthRequired] = useState<boolean>(false);

  const [monthValue, setMonthValue] = useState<string>("");
  const [filteredMonths, setFilteredMonths] = useState<string[]>([]);
  const [isInputMonthFocused, setIsInputMonthFocused] = useState<boolean>(false);

  const [dayValue, setDayValue] = useState<string>("");
  const [filteredDays, setFilteredDays] = useState<string[]>([]);
  const [isInputDayFocused, setIsInputDayFocused] = useState<boolean>(false);

  const [yearValue, setYearValue] = useState<string>("");
  const [filteredYears, setFilteredYears] = useState<number[]>([]);
  const [isInputYearFocused, setIsInputYearFocused] = useState<boolean>(false);

  const [isCheck, setIsCheck] = useState<boolean>(false);

  const inputDisplayNameRef = useRef<HTMLInputElement>(null);
  const inputUsernameRef = useRef<HTMLInputElement>(null);
  const inputMonthRef = useRef<HTMLInputElement>(null);
  const inputDayRef = useRef<HTMLInputElement>(null);
  const inputYearRef = useRef<HTMLInputElement>(null);

  const handleDisplayNameFocus = () => {
    setIsDisplayNameFocused(!isDisplayNameFocused);
  };

  const handleUsernameFocus = () => {
    setIsUsernameFocused(!isUsernameFocused);
  };

  const handleInputMonthFocus = () => {
    setIsInputMonthFocused(!isInputMonthFocused);
  };

  const handleInputDayFocus = () => {
    setIsInputDayFocused(!isInputDayFocused);
  };

  const handleInputYearFocus = () => {
    setIsInputYearFocused(!isInputYearFocused);
  };

  const handleChecklist = () => {
    setIsCheck(!isCheck);
  };

  const handleToLogin = () => {
    router.push("/login");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setEmailValue(value);

    if (emailValue !== "" && value === "") {
      setEmailRequired(true);
    }

    if (emailValue === "" && value !== "") {
      setEmailRequired(false);
    }
  };

  const handleDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setDisplayNameValue(value);
  };

  const handleUsernameChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setUsernameValue(value);

    if (usernameValue !== "" && value === "") {
      setUsernameRequired(true);
    }

    if (usernameValue === "" && value !== "") {
      setUsernameRequired(false);
    }

    const response = await axios.post("/api/check", {
      username: value,
    });

    if (response.data.status === 409) {
      setUsernameErrorValue(response.data.message);
      setUsernameSuccessValue("");
    }

    if (response.data.status === 400) {
      setUsernameErrorValue(response.data.message);
      setUsernameSuccessValue("");
    }

    if (response.data.status === 200) {
      setUsernameSuccessValue(response.data.message);
      setUsernameErrorValue("");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setPasswordValue(value);

    if (passwordValue !== "" && value === "") {
      setPasswordRequired(true);
      setPasswordErrorValue("");
    }

    if (passwordValue === "" && value !== "") {
      setPasswordRequired(false);
    }
  };

  const handleInputMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setMonthValue(value);

    if (isInputMonthFocused) {
      const filtered = MONTHS.filter((month) => month.toLowerCase().includes(value.toLowerCase()));

      setFilteredMonths(filtered);
    }
  };

  const handleInputDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setDayValue(value);

    if (isInputDayFocused) {
      const filtered = DAYS.filter((day) => day.toLowerCase().includes(value.toLowerCase()));

      setFilteredDays(filtered);
    }
  };

  const handleInputYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setYearValue(value);

    if (isInputYearFocused) {
      const filtered = YEARS.filter((year) => year.toString().toLowerCase().includes(value.toLowerCase()));

      setFilteredYears(filtered);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailValue) {
      setEmailRequired(true);
    }

    if (!usernameValue) {
      setUsernameRequired(true);
    }

    if (!passwordValue) {
      setPasswordRequired(true);
    }

    if (!monthValue || !dayValue || !yearValue) {
      setBirthRequired(true);
    }

    if (emailValue && usernameValue && passwordValue && monthValue && dayValue && yearValue) {
      setIsLoading(true);

      const response = await axios.post("/api/user", {
        email: emailValue,
        name: displayNameValue,
        username: usernameValue,
        password: passwordValue,
        monthBirth: monthValue,
        dayBirth: dayValue,
        yearBirth: yearValue,
      });

      setIsLoading(false);

      console.log(response);

      if (response.data.status === 409) {
        setEmailErrorValue(response.data.message);
      }

      if (response.data.status === 400) {
        setPasswordErrorValue(response.data.message);
      }

      if (response.data.status === 201) {
        router.push("/login");
      }
    }
  };

  const handleMonthClick = (month: string) => {
    setMonthValue(month);

    setIsInputMonthFocused(false);
    setIsInputDayFocused(true);
  };

  const handleDayClick = (day: string) => {
    setDayValue(day);

    setIsInputDayFocused(false);
    setIsInputYearFocused(true);
  };

  const handleYearClick = (year: string) => {
    setYearValue(year);

    setIsInputYearFocused(false);
  };

  useEffect(() => {
    const handleClickOutsideDisplayName = (event: MouseEvent) => {
      if (inputDisplayNameRef.current && !inputDisplayNameRef.current.contains(event.target as Node)) {
        setIsDisplayNameFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDisplayName);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDisplayName);
    };
  }, [inputDisplayNameRef]);

  useEffect(() => {
    const handleClickOutsideUsername = (event: MouseEvent) => {
      if (inputUsernameRef.current && !inputUsernameRef.current.contains(event.target as Node)) {
        setIsUsernameFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideUsername);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideUsername);
    };
  }, [inputUsernameRef]);

  const handleDropdownClose = (ref: RefObject<HTMLDivElement>, setOpen: Dispatch<SetStateAction<boolean>>) => {
    return (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
  };

  useEffect(() => {
    const monthHandler = handleDropdownClose(inputMonthRef, setIsInputMonthFocused);
    const dayHandler = handleDropdownClose(inputDayRef, setIsInputDayFocused);
    const yearHandler = handleDropdownClose(inputYearRef, setIsInputYearFocused);

    document.addEventListener("mousedown", monthHandler);
    document.addEventListener("mousedown", dayHandler);
    document.addEventListener("mousedown", yearHandler);

    return () => {
      document.removeEventListener("mousedown", monthHandler);
      document.removeEventListener("mousedown", dayHandler);
      document.removeEventListener("mousedown", yearHandler);
    };
  }, [inputMonthRef, inputDayRef, inputYearRef, setIsInputMonthFocused, setIsInputDayFocused, setIsInputYearFocused]);

  useEffect(() => {
    if (monthValue && dayValue && yearValue) {
      setBirthRequired(false);
    }
  }, [monthValue, dayValue, yearValue]);

  return (
    <>
      <AuthLayout>
        <form
          className="w-[480px] mx-auto p-8 bg-primary rounded-[5px] shadow-elevation-high text-muted text-lg"
          onSubmit={handleSubmit}
        >
          <div className="w-full text-center">
            <button
              type="button"
              className="relative block w-auto h-auto mb-4 py-0.5 px-1 rounded-[3px] text-white-500 text-sm font-medium leading-4 select-none"
            >
              <div className="my-0 mx-auto shadow-modifier truncate">
                <div className="flex items-center">
                  <svg
                    className="mr-1 mb-[1px]"
                    aria-hidden="true"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M14.7 5.3a1 1 0 0 1 0 1.4L9.42 12l5.3 5.3a1 1 0 0 1-1.42 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.42 0Z"
                      className=""
                    ></path>
                  </svg>
                  <div className="text-normal text-base font-normal leading-5">Go back</div>
                </div>
              </div>
            </button>
            <h1 className="text-header-primary text-2xl font-semibold leading-[30px]">Create an account</h1>
            <div className="w-full mt-5 text-left">
              <div className="mb-5">
                <label
                  htmlFor=""
                  className={clsx(
                    "block mb-2 text-xs font-bold leading-4 uppercase tracking-[0.02em]",
                    emailErrorValue || emailRequired ? "text-danger" : "text-interactive-normal"
                  )}
                >
                  Email
                  {emailErrorValue || emailRequired ? (
                    <span className="text-danger text-xs font-medium italic normal-case">
                      <span className="px-1">-</span>
                      {emailErrorValue ? emailErrorValue : "Required"}
                    </span>
                  ) : (
                    <span className="pl-1 text-status-danger">*</span>
                  )}
                </label>
                <div className="flex flex-col">
                  <input
                    type="email"
                    maxLength={999}
                    className="w-full h-10 p-2.5 outline-none bg-tertiary rounded-[3px] text-white-500 text-base caret-white-500"
                    onChange={handleEmailChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor=""
                  className="block mb-2 text-interactive-normal text-xs font-bold leading-4 uppercase tracking-[0.02em]"
                >
                  Display Name
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={displayNameValue}
                    maxLength={32}
                    className="w-full h-10 p-2.5 outline-none bg-tertiary rounded-[3px] text-white-500 text-base caret-white-500"
                    onChange={handleDisplayNameChange}
                    onClick={handleDisplayNameFocus}
                    ref={inputDisplayNameRef}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div
                className={clsx(
                  "overflow-hidden transition-all",
                  isDisplayNameFocused ? "h-[18px] -mt-3 pb-10" : "h-0 mt-0 pb-0"
                )}
              >
                <div className={clsx("transition-opacity", isDisplayNameFocused ? "opacity-100" : "opacity-0")}>
                  <div
                    className={clsx(
                      "text-sm font-normal leading-[18px] transition-colors duration-[800ms]",
                      isDisplayNameFocused ? "text-white-500" : "text-normal"
                    )}
                  >
                    This is how others see you. You can use special characters and emoji.
                  </div>
                </div>
              </div>
              <div className="" tabIndex={-1}>
                <div className="mb-5">
                  <label
                    htmlFor=""
                    className={clsx(
                      "block mb-2 text-xs font-bold leading-4 uppercase tracking-[0.02em]",
                      usernameRequired ? "text-danger" : "text-interactive-normal"
                    )}
                  >
                    Username
                    {usernameRequired ? (
                      <span className="text-danger text-xs font-medium italic normal-case">
                        <span className="px-1">-</span>
                        Required
                      </span>
                    ) : (
                      <span className="pl-1 text-status-danger">*</span>
                    )}
                  </label>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      maxLength={999}
                      className="w-full h-10 p-2.5 outline-none bg-tertiary rounded-[3px] text-white-500 text-base"
                      onChange={handleUsernameChange}
                      onClick={handleUsernameFocus}
                      ref={inputUsernameRef}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div
                  className={clsx(
                    "overflow-hidden transition-all duration-150",
                    isUsernameFocused ? "h-[18px] -mt-3 pb-10" : "h-0 mt-0 pb-0"
                  )}
                >
                  <div
                    className={clsx(
                      "transition-opacity",
                      isUsernameFocused && usernameErrorValue.length == 0 ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div
                      className={clsx(
                        "text-sm font-normal leading-[18px] transition-colors duration-[800ms]",
                        isUsernameFocused ? "text-white-500" : "text-normal"
                      )}
                    >
                      {isUsernameFocused &&
                        displayNameValue.length != 0 &&
                        usernameValue.length == 0 &&
                        usernameErrorValue.length == 0 && (
                          <>
                            Here is a suggestion:{" "}
                            <button type="button" className="text-link hover:underline">
                              {displayNameValue}
                            </button>
                          </>
                        )}
                      {isUsernameFocused &&
                        displayNameValue.length == 0 &&
                        usernameErrorValue.length == 0 &&
                        usernameSuccessValue.length == 0 &&
                        "Please only use numbers, letters, underscores _ , or periods."}
                    </div>
                  </div>
                  {usernameErrorValue && (
                    <div className="text-danger text-sm font-normal leading-[18px]">{usernameErrorValue}</div>
                  )}
                  {usernameSuccessValue && (
                    <div className="text-positive text-sm font-normal leading-[18px]">{usernameSuccessValue}</div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className={clsx(
                    "block mb-2 text-xs font-bold leading-4 uppercase tracking-[0.02em]",
                    passwordErrorValue || passwordRequired ? "text-danger" : "text-interactive-normal"
                  )}
                >
                  Password
                  {passwordRequired || passwordErrorValue ? (
                    <span className="text-danger text-xs font-medium italic normal-case">
                      <span className="px-1">-</span>
                      {passwordErrorValue ? passwordErrorValue : "Required"}
                    </span>
                  ) : (
                    <span className="pl-1 text-status-danger">*</span>
                  )}
                </label>
                <div className="flex flex-col">
                  <input
                    type="password"
                    maxLength={999}
                    className="w-full h-10 p-2.5 outline-none bg-tertiary rounded-[3px] text-white-500 text-base"
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <fieldset className="flex flex-col mt-5">
                <legend
                  className={clsx(
                    "mb-2 text-xs font-bold leading-4 uppercase tracking-[0.02em]",
                    birthRequired ? "text-danger" : "text-interactive-normal"
                  )}
                >
                  Date of birth
                  {birthRequired ? (
                    <span className="text-danger text-xs font-medium italic normal-case">
                      <span className="px-1">-</span>
                      Required
                    </span>
                  ) : (
                    <span className="pl-1 text-status-danger">*</span>
                  )}
                </legend>
                <div className="flex justify-between w-full mb-1">
                  <div className="w-[35%]" tabIndex={1}>
                    <div>
                      <div>
                        <div className="relative w-full text-base font-medium" onClick={handleInputMonthFocus}>
                          <div className="relative flex justify-between items-center flex-wrap min-h-10 border border-tertiary bg-tertiary rounded">
                            <input
                              type="text"
                              placeholder="Month"
                              value={monthValue}
                              className="relative flex items-center flex-1 flex-wrap w-full py-0.5 px-2 outline-none bg-transparent caret-white-500 overflow-hidden cursor-default placeholder:text-muted"
                              onChange={handleInputMonthChange}
                              disabled={isLoading}
                            />
                            <div className="flex items-start self-stretch shrink-0">
                              <div className="flex py-2 pr-2 text-interactive-normal cursor-pointer hover:text-white-500 transition-colors duration-150">
                                <svg
                                  height="20"
                                  width="20"
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                  focusable="false"
                                  className="inline-block fill-current stroke-current stroke-0 leading-none"
                                >
                                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div
                            className={clsx(
                              "absolute left-0 right-0 bottom-full flex-col max-h-[217px] border border-tertiary bg-secondary rounded-[3px] overflow-x-hidden overflow-y-auto",
                              isInputMonthFocused ? "flex" : "hidden"
                            )}
                            ref={inputMonthRef}
                          >
                            {monthValue.trim() === "" ? (
                              MONTHS.map((month, index) => (
                                <button
                                  type="button"
                                  className="p-2 text-interactive-normal text-left hover:bg-modifier-hover hover:text-white-500"
                                  onClick={() => handleMonthClick(month)}
                                  key={index}
                                >
                                  {month}
                                </button>
                              ))
                            ) : filteredMonths.length > 0 ? (
                              filteredMonths.map((month, index) => (
                                <button
                                  type="button"
                                  className="p-2 text-interactive-normal text-left hover:bg-modifier-hover hover:text-white-500"
                                  onClick={() => handleMonthClick(month)}
                                  key={index}
                                >
                                  {month}
                                </button>
                              ))
                            ) : (
                              <button type="button" className="p-2 text-interactive-normal text-left">
                                No results found
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[30%]" tabIndex={2}>
                    <div>
                      <div>
                        <div className="relative w-full text-base font-medium" onClick={handleInputDayFocus}>
                          <div className="relative flex justify-between items-center flex-wrap min-h-10 border border-tertiary bg-tertiary rounded">
                            <input
                              type="text"
                              placeholder="Day"
                              value={dayValue}
                              className="relative flex items-center flex-1 flex-wrap w-full py-0.5 px-2 outline-none bg-transparent caret-white-500 overflow-hidden cursor-default placeholder:text-muted"
                              onChange={handleInputDayChange}
                              disabled={isLoading}
                            />
                            <div className="flex items-start self-stretch shrink-0">
                              <div className="flex py-2 pr-2 text-interactive-normal cursor-pointer hover:text-white-500 transition-colors duration-150">
                                <svg
                                  height="20"
                                  width="20"
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                  focusable="false"
                                  className="inline-block fill-current stroke-current stroke-0 leading-none"
                                >
                                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div
                            className={clsx(
                              "absolute left-0 right-0 bottom-full flex-col max-h-[217px] border border-tertiary bg-secondary rounded-[3px] overflow-x-hidden overflow-y-auto",
                              isInputDayFocused ? "flex" : "hidden"
                            )}
                            ref={inputDayRef}
                          >
                            {dayValue.trim() === "" ? (
                              DAYS.map((day, index) => (
                                <button
                                  type="button"
                                  className="p-2 text-interactive-normal text-left hover:bg-modifier-hover hover:text-white-500"
                                  onClick={() => handleDayClick(day)}
                                  key={index}
                                >
                                  {day}
                                </button>
                              ))
                            ) : filteredDays.length > 0 ? (
                              filteredDays.map((day, index) => (
                                <button
                                  type="button"
                                  className="p-2 text-interactive-normal text-left hover:bg-modifier-hover hover:text-white-500"
                                  onClick={() => handleDayClick(day)}
                                  key={index}
                                >
                                  {day}
                                </button>
                              ))
                            ) : (
                              <button type="button" className="p-2 text-interactive-normal text-center leading-none">
                                No results found
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[30%]" tabIndex={3}>
                    <div>
                      <div>
                        <div className="relative w-full text-base font-medium" onClick={handleInputYearFocus}>
                          <div className="relative flex justify-between items-center flex-wrap min-h-10 border border-tertiary bg-tertiary rounded">
                            <input
                              type="text"
                              placeholder="Year"
                              value={yearValue}
                              className="relative flex items-center flex-1 flex-wrap w-full py-0.5 px-2 outline-none bg-transparent caret-white-500 overflow-hidden cursor-default placeholder:text-muted"
                              onChange={handleInputYearChange}
                              disabled={isLoading}
                            />
                            <div className="flex items-start self-stretch shrink-0">
                              <div className="flex py-2 pr-2 text-interactive-normal cursor-pointer hover:text-white-500 transition-colors duration-150">
                                <svg
                                  height="20"
                                  width="20"
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                  focusable="false"
                                  className="inline-block fill-current stroke-current stroke-0 leading-none"
                                >
                                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div
                            className={clsx(
                              "absolute left-0 right-0 bottom-full flex-col max-h-[217px] border border-tertiary bg-secondary rounded-[3px] overflow-x-hidden overflow-y-auto",
                              isInputYearFocused ? "flex" : "hidden"
                            )}
                            ref={inputYearRef}
                          >
                            {yearValue.trim() === "" ? (
                              YEARS.map((year, index) => (
                                <button
                                  type="button"
                                  className="p-2 text-interactive-normal text-left hover:bg-modifier-hover hover:text-white-500"
                                  onClick={() => handleYearClick(year.toString())}
                                  key={index}
                                >
                                  {year}
                                </button>
                              ))
                            ) : filteredYears.length > 0 ? (
                              filteredYears.map((year, index) => (
                                <button
                                  type="button"
                                  className="p-2 text-interactive-normal text-left hover:bg-modifier-hover hover:text-white-500"
                                  onClick={() => handleYearClick(year.toString())}
                                  key={index}
                                >
                                  {year}
                                </button>
                              ))
                            ) : (
                              <button type="button" className="p-2 text-interactive-normal text-center leading-none">
                                No results found
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="flex justify-start items-center flex-nowrap mt-2">
                <label
                  htmlFor=""
                  className="relative flex items-center flex-auto max-w-full mr-2 text-base select-none"
                >
                  <input
                    type="checkbox"
                    className="absolute top-0 left-0 z-[1] w-6 h-6 opacity-0 cursor-pointer appearance-none"
                    onClick={handleChecklist}
                    disabled={isLoading}
                  />
                  <div
                    className={clsx(
                      "flex justify-center items-center flex-[0_0_auto] w-6 h-6 border rounded-md",
                      isCheck ? "border-brand-experiment-400 bg-brand-experiment" : "border-primary-400"
                    )}
                  >
                    <svg
                      aria-hidden="true"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill={clsx(isCheck ? "hsl(0 calc(1 * 0%) 100% / 1)" : "transparent")}
                        d="M21.7 5.3a1 1 0 0 1 0 1.4l-12 12a1 1 0 0 1-1.4 0l-6-6a1 1 0 1 1 1.4-1.4L9 16.58l11.3-11.3a1 1 0 0 1 1.4 0Z"
                        className=""
                      ></path>
                    </svg>
                  </div>
                  <div className="flex-auto pl-2 min-w-0 leading-6 cursor-pointer">
                    <div className="text-muted text-xs font-normal leading-4">
                      (Optional) It's okay to send me emails with Discord updates, tips, and special offers. You can opt
                      out at any time.
                    </div>
                  </div>
                </label>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="relative flex justify-center items-center w-full min-w-[130px] h-[44px] min-h-[44px] py-0.5 px-4 bg-brand-experiment rounded-[3px] text-white-500 text-base font-medium leading-6 select-none hover:bg-brand-experiment-560 transition-colors duration-[170ms]"
                  disabled={isLoading}
                >
                  <div className="my-0 mx-auto bg-modifier truncate">
                    {isLoading ? <LoadingFlashing /> : "Continue"}
                  </div>
                </button>
              </div>
              <div className="mt-2 text-muted text-xs font-normal leading-4">
                By registering, you agree to Discord's{" "}
                <Link href={"/"} className="text-link hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={"/"} className="text-link hover:underline">
                  Privacy Policy
                </Link>
                .
              </div>
              <button
                type="button"
                className="relative block w-auto h-auto mt-5 py-0.5 px-1 px-0 rounded-[3px] text-link text-sm font-medium leading-4 select-none hover:underline"
                onClick={handleToLogin}
              >
                <div className="my-0 mx-auto bg-modifier truncate">Already have an account?</div>
              </button>
            </div>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default RegisterPage;
