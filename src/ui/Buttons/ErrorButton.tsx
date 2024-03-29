"use client";

const ErrorButton = () => {
  return (
    <button
      onClick={() => {
        throw new Error("Error Boundary Test");
      }}
    >
      Throw error
    </button>
  );
};

export default ErrorButton;
