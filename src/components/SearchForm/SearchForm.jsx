import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  submit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.submit}>
        <InputSearch
          value={this.state.query}
          onChange={e => this.setState({ query: e.target.value })}
        />
        <FormBtn>
          <FiSearch />
        </FormBtn>
      </SearchFormStyled>
    );
  }
}
