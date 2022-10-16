import React from "react";
import LoginForm from "../../components/Form/LoginForm";
export default function Login() {
  return (
    <div className="bg-black border-gray-50 border-t-2 border-b-2 h-full">
      <div
        className="lg:max-w-screen-sm container mx-auto border-0 rounded-lg my-32"
        style={{ backgroundColor: " rgba(60, 60, 60, 0.4)" }}
      >
        <LoginForm id="dangNhap" />
      </div>
    </div>
  );
}
