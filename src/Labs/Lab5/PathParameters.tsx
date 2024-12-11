import React, { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div className="p-4">
      <h3>Path Parameters</h3>
      <div className="mb-4">
        <input
          className="form-control mb-2"
          id="wd-path-parameter-a"
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
        <input
          className="form-control mb-2"
          id="wd-path-parameter-b"
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
      </div>
      
      <div className="d-flex gap-2 flex-wrap">
        <a
          className="btn btn-primary"
          id="wd-path-parameter-add"
          href={`${REMOTE_SERVER}/lab5/add/${a}/${b}`}
        >
          Add {a} + {b}
        </a>
        
        <a
          className="btn btn-danger"
          id="wd-path-parameter-subtract"
          href={`${REMOTE_SERVER}/lab5/subtract/${a}/${b}`}
        >
          Subtract {a} - {b}
        </a>
        
        <a
          className="btn btn-success"
          id="wd-path-parameter-multiply"
          href={`${REMOTE_SERVER}/lab5/multiply/${a}/${b}`}
        >
          Multiply {a} × {b}
        </a>
        
        <a
          className="btn btn-warning"
          id="wd-path-parameter-divide"
          href={`${REMOTE_SERVER}/lab5/divide/${a}/${b}`}
        >
          Divide {a} ÷ {b}
        </a>
      </div>
      
      <hr className="mt-4" />
    </div>
  );
}