import React, { useState } from "react";
import "./App.css";

function App() {
  // inputformからの入力を受け取るstate
  const [inputValue, setInputValue] = useState("");

  // useStateにはTodoで指定した型しか適用させない　　この配列には指定した型しか入らない
  const [todos, setTodos] = useState<Todo[]>([]);

  // 型の指定
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  // inputformで受け取った値を取得する関数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };

  // 送信ボタンを押した時の処理の流れ
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 新しいTodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };
    // todosを展開して、newTodoへ値を格納して、最後にinputformの中を空にする
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  return (
    <div className="wrapper">
      <h2>TypeScript TodoApp</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => handleChange(e)} />
        <input type="submit" value="作成" />
      </form>
    </div>
  );
}

export default App;
