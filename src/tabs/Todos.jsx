import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };
  componentDidMount() {
    this.setState({
      todos: JSON.parse(localStorage.getItem('todos')) ?? [],
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  handelSubmit = text => {
    const newTodo = { id: nanoid(), text };
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  handleTodoDelete = id => {
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
  };
  handleTodoEdit = id => {
    const index = this.state.todos.findIndex(todo => todo.id === id);

    this.setState(prevState => ({ todos: [...prevState.todos, ...todo] }));
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handelSubmit} />
        <Grid>
          {todos.map(({ id, text }, index) => (
            <GridItem key={id}>
              <Todo
                id={id}
                onEdit={handleTodoEdit}
                text={text}
                index={index + 1}
                onDelete={() => this.handleTodoDelete(id)}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
