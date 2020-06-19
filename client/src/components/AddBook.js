import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: '',
  };

  getAuthors() {
    let data = this.props.data;
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
  };

  render() {
    return (
      <form id="add-book" onSubmit={this.submtForm}>
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

export default graphql(getAuthorsQuery)(AddBook);
