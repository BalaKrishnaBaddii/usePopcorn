import { useState } from "react";

export default function Box({ children }) {
  const [isOpen, setisOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setisOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
