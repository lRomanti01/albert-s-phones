import React from "react";
import { ClockLoader } from "react-spinners";


export function Spinner({ loading, message, longMessage }) {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return loading ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col justify-center items-center">
        <ClockLoader
          color="#fff"
          loading={loading}
          cssOverride={override}
          size={90}
        />
        {message && (
          <span
            style={{ width: longMessage ? "60%" : "100%" }}
            className="text-white text-2xl font-semibold mt-4 capitalize text-center"
          >
            {message}
          </span>
        )}
      </div>
    </div>
  ) : null;
}
