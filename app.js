const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMessage = document.getElementById('empty-message');

let todos = [];

function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function createTodoElement(todo) {
  const item = document.createElement('li');
  item.className = 'todo-item';
  item.dataset.id = todo.id;

  // 체크박스와 삭제 버튼은 자리만 잡아 둔다. 동작은 #4에서 구현한다.
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-check';
  checkbox.checked = todo.done;
  checkbox.disabled = true;

  const text = document.createElement('span');
  text.className = 'todo-text';
  text.textContent = todo.text;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'todo-delete';
  deleteButton.textContent = '삭제';
  deleteButton.disabled = true;

  item.append(checkbox, text, deleteButton);
  return item;
}

function render() {
  list.replaceChildren(...todos.map(createTodoElement));
  emptyMessage.hidden = todos.length > 0;
}

function addTodo(text) {
  todos.push({ id: createId(), text, done: false });
  render();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (text) {
    addTodo(text);
    input.value = '';
  }
  input.focus();
});

render();
