import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, getBooksQuery } from '../queries/queries';
import { addBookMutation } from '../mutations/mutations';

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: '',
  };

  getAuthors() {
    let data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading...</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  submitForm = (event) => {
    event.preventDefault();
    this.props.addBookMutation({
      variables: {
        ...this.state,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label>Book Name:</label>
          <input
            type="text"
            required
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            required
            onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            required
            onChange={(e) => this.setState({ authorId: e.target.value })}
          >
            <option selected disabled>
              Select Author
            </option>
            {this.getAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
