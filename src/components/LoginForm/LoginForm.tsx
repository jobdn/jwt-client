import React from "react";
import { useNavigate } from "react-router-dom";

import { Form } from "components/Form";
import { useAppDispatch, useAppSelector } from "hooks";

import { loginThunk } from "store/thunks/login.thunk";
import { Input } from "components/Input";

export const LoginForm = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.user.loading);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> =
    React.useCallback((e) => {
      e.preventDefault();
      dispatch(loginThunk({ email, password }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch(console.error);
    }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((e) => {
      if (e.target.name === "email") {
        setEmail(e.target.value);
      } else {
        setPassword(e.target.value);
      }
    }, []);

  return (
    <Form onSubmit={handleSubmit} loading={loading} buttonLabel="Login">
      <Input
        type="email"
        name="email"
        id="email"
        label="E-mail"
        value={email}
        onChange={handleChange}
        placeholder="email@gmail.com"
        className="input"
      />
      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
        value={password}
        onChange={handleChange}
        placeholder="Enter Your Password"
        className="input"
      />
    </Form>
  );
};
