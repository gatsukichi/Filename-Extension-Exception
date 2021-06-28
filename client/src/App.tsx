import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

type fixedExtension = {
  name: string;
  isChecked: false;
};
type customExtension = {
  name: string;
};

function App() {
  const [text, setText] = useState<string>("");
  const [fixed, setFixed] = useState<fixedExtension[]>([]);
  const [custom, setCustom] = useState<customExtension[]>([]);
  function checkAxios(update: {
    name: string;
    isChecked: boolean;
    type: string;
  }): void {
    axios
      .post(
        "http://localhost:4000/data",
        { data: update },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data: any) => {
        console.log(data.data.fixed);
        setFixed(data.data.fixed);
        setCustom(data.data.custom);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteAxios(name: string) {
    axios
      .delete("http://localhost:4000/data", {
        params: { name },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data: any) => {
        console.log(data.data.fixed);
        setFixed(data.data.fixed);
        setCustom(data.data.custom);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    axios.get("http://localhost:4000/data").then((data: any) => {
      console.log(data);
      setFixed(data.data.fixed);
      setCustom(data.data.custom);
    });
  }, []);

  return (
    <div className="App">
      <h1>파일 확장자 차단</h1>
      <div>
        파일확장자에 따라 특정 형식의 파일을 첨부허거나 전송하지 못하도록 제한
      </div>
      <div>
        <div className="label">고정 확장자</div>
        <div className="checkBoxContainer">
          {fixed.map((el, idx) => {
            return (
              <div key={idx}>
                {el.isChecked ? (
                  <input
                    type="checkbox"
                    defaultChecked
                    value={el.name}
                    onClick={(e) => {
                      checkAxios({
                        name: el.name,
                        isChecked: !el.isChecked,
                        type: "fixed",
                      });
                      console.log(el.name, !el.isChecked);
                    }}
                  ></input>
                ) : (
                  <input
                    type="checkbox"
                    value={el.name}
                    onClick={(e) => {
                      // e.target.checked = !e.target.checked;
                      checkAxios({
                        name: el.name,
                        isChecked: !el.isChecked,
                        type: "fixed",
                      });
                      console.log(el.name, !el.isChecked);
                    }}
                  ></input>
                )}
                <div className="label">{el.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>커스텀 확장자</div>
      <form
        onSubmit={(e) => {
          // e.preventDefault();
          checkAxios({
            name: text,
            isChecked: false,
            type: "custom",
          });
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></input>
      </form>
      <div className="customContainer">
        {custom.map((el, idx) => {
          return (
            <div className="customBox" key={idx}>
              <div className="label">{el.name}</div>
              <div
                className="X-mark"
                onClick={(e) => {
                  deleteAxios(el.name);
                }}
              >
                X
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
