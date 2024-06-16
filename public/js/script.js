// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Fetch todos from server
    fetch('/api/todos')
        .then(response => response.json())
        .then(data => {
            data.forEach(todo => addTodoToDOM(todo));
        });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value;

        // Send new todo to server
        fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        })
            .then(response => response.json())
            .then(todo => {
                addTodoToDOM(todo);
                input.value = '';
            });
    });

    list.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const id = e.target.dataset.id;

            // Delete todo from server
            fetch(`/api/todos/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(() => {
                    e.target.parentElement.remove();
                });
        }
    });

    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.innerHTML = `${todo.text} <button data-id="${todo.id}">Delete</button>`;
        list.appendChild(li);
    }
});
