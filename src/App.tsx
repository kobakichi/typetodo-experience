import React, { useState } from "react";
import "./App.css";

export const App = () => {
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

  // タスクを編集する関数
  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      // ここでreturnを返さないとエラーが吐かれる
      return todo;
    });

    setTodos(newTodos);
  };

  // チェックボックスの処理
  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="wrapper">
      <h2>TypeScript TodoApp</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={inputValue}
          placeholder="タスクを入力"
          onChange={handleChange}
        />
        <button type="submit">作成</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.inputValue}
              onChange={(e) => handleEdit(todo.id, e.target.value)}
              disabled={todo.checked}
            />
            <input
              type="checkbox"
              onChange={() => handleChecked(todo.id, todo.checked)}
            />
            <button onClick={() => handleDelete(todo.id)}>消去</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
