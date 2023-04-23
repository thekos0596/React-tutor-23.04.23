import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export class Todo extends Component {
  state = {
    text: this.props.text,
  };

  submit = e => {
    e.preventDefault();
    this.props.onEdit(this.props.id);
  };
  render() {
    return (
      <TodoWrapper>
        <Text textAlign="center" marginBottom="20px">
          TODO #{this.props.index}
        </Text>
        {/* <input value={text} /> */}
        <SearchFormStyled onSubmit={this.submit}>
          <InputSearch
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <FormBtn>
            <FiSearch />
          </FormBtn>
        </SearchFormStyled>
        <DeleteButton type="button" onClick={this.props.onDelete}>
          <RiDeleteBinLine size={24} />
        </DeleteButton>
      </TodoWrapper>
    );
  }
}
