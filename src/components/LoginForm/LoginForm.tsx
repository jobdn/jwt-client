/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "components/Form";
import { useAppDispatch, useAppSelector } from "hooks";
import { loginThunk } from "store/thunks/login.thunk";
import { Input } from "components/Input";

enum AvailableLoginFormFieldsId {
  EMAIL = "email",
  PASSWORD = "password",
}

export const LoginForm = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.user.loading);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    dispatch(loginThunk({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch(console.error);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.id === AvailableLoginFormFieldsId.EMAIL) {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <Form onSubmit={handleSubmit} loading={loading} buttonLabel="Login">
      <Input
        type="email"
        id={AvailableLoginFormFieldsId.EMAIL}
        label="E-mail"
        value={email}
        onChange={handleChange}
        placeholder="email@gmail.com"
        className="input"
      />
      <Input
        type="password"
        id={AvailableLoginFormFieldsId.PASSWORD}
        label="Password"
        value={password}
        onChange={handleChange}
        placeholder="Enter Your Password"
        className="input"
      />
    </Form>
  );
};
