import React from 'react';
import {TodosPage} from "./views/pages/todos/TodosPage";

function App() {
  return (
      <>
        <TodosPage/>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
          <p>Created by <a href="http://todomvc.com">Saravanane Manicome</a></p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>

        <script src="node_modules/todomvc-common/base.js"></script>
      </>
  );
}

export default App;
