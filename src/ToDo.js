import React, { Component, Fragment } from "react";
import firebase from "firebase/app";

class ToDo extends Component {
  state = {
    todos: [],
    todo: {},
    newTodo: {
      task: "",
      done: false
    },
    editId: null
  };

  handleTaskEdit = event => {
    this.setState({
      todo: { ...this.state.todo, task: event.target.value }
    });
  };

  handleDoneEdit = event => {
    this.setState({
      todo: { ...this.state.todo, done: event.target.checked }
    });
  };

  handleChange = event => {
    this.setState({
      newTodo: { ...this.state.newTodo, task: event.target.value }
    });
  };

  handleEdit = todo => {
    this.setState({
      todo: { ...todo },
      editId: todo.id
    });
  };

  handleDelete = todoId => {
    const ref = this.state.ref;
    if (this.state.todos.length > 1) {
      ref.child(todoId).remove()
    } else {
      window.alert("Musi być przynajmniej jeden element!");
    }
    ref.once("value").then(snapshot => {
      const todos = snapshot.val();
      const todosArray = Object.keys(todos).map(key => ({
        id: key,
        ...todos[key]
      }));

      this.setState({
        todos: todosArray
      });
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const ref = this.state.ref;
    if (ref && this.state.newTodo.task) {
      const newTodoKey = ref.push().key;
      ref.child(newTodoKey).set({
        task: this.state.newTodo.task,
        done: false
      });
      this.setState({ newTodo: { task: "", done: false } });
    }
  };

  handleSave = todoId => {
    const ref = this.state.ref;

    ref.child(todoId).set({
      ...this.state.todo
    });

    ref.once("value").then(snapshot => {
      const todos = snapshot.val();
      const todosArray = Object.keys(todos).map(key => ({
        id: key,
        ...todos[key]
      }));

      this.setState({
        todos: todosArray
      });
    });

    this.setState({ editId: null });
  };

  componentDidMount() {
    const ref = firebase.database().ref("todos");
    ref.once("value").then(snapshot => {
      const todos = snapshot.val();
      const todosArray = Object.keys(todos).map(key => ({
        id: key,
        ...todos[key]
      }));

      this.setState({
        todos: todosArray
      });
    });
    ref.on("value", snapshot => {
      const todos = snapshot.val();
      const todosArray = Object.keys(todos).map(key => ({
        id: key,
        ...todos[key]
      }));

      this.setState({
        todos: todosArray
      });
    });

    this.setState({
      ref
    });
  }

  componentWillUnmount() {
    this.state.ref && this.state.ref.off();
    this.state.authRef && this.state.authRef();
  }

  render() {
    return (
      <Fragment>
        <table>
          <thead>
            <tr>
              <td>
                <h1>Task</h1>
              </td>
              <td>
                <h1>Is it done?</h1>
              </td>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map(todo => (
              <tr>
                <td>
                  {this.state.editId === todo.id ? (
                    <input
                      type="text"
                      name="todoTask"
                      value={this.state.todo.task}
                      onChange={this.handleTaskEdit}
                    />
                  ) : (
                    todo.task
                  )}
                </td>
                <td>
                  {this.state.editId === todo.id ? (
                    <input
                      type="checkbox"
                      name="todoDone"
                      value={this.state.todo.done}
                      onChange={this.handleDoneEdit}
                    />
                  ) : todo.done ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td>
                  {this.state.editId === todo.id ? (
                    <button
                      color="primary"
                      variant="contained"
                      onClick={() => this.handleSave(todo.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      color="primary"
                      variant="contained"
                      onClick={() => this.handleEdit(todo)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => this.handleDelete(todo.id)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="task"
            value={this.state.newTodo.task}
            onChange={this.handleChange}
          />
          <button type="submit">Dodaj</button>
        </form>
      </Fragment>
    );
  }
}

export default ToDo;