import React from 'react';
export default function Login() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input className="border p-2 w-full mb-4" placeholder="Email" />
      <input type="password" className="border p-2 w-full mb-4" placeholder="Password" />
      <button className="bg-blue-600 text-white p-2 w-full">Login</button>
    </div>
  );
}
