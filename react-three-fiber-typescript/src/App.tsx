import React, { useState } from "react";
import "./App.css";
import { LineAR } from "./sampleAR/lineAR";

function App() {
  const [isAR, setIsAR] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setIsAR(!isAR)}>
        {isAR ? "メインに戻る" : "ARを試す"}
      </button>
      {isAR ? (
        <LineAR />
      ) : (
        <div>
          ここはメインページです
          <br />
          ver.4
        </div>
      )}
    </div>
  );
}

export default App;
