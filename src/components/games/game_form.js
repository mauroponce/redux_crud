import React, { Component } from 'react';
import classnames from 'classnames';

class GameForm extends Component {
  state = {
    title: '',
    cover: '',
    errors: {}
  }

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors); // lo clono
      delete errors[name];
      this.setState({
        [name] : value,
        errors
      });
    } else {
      this.setState({ [name] : value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (this.state.title === '') {
      errors.title = "Title can't be empty"
    }

    if (this.state.cover === '') {
      errors.cover = "Cover can't be empty"
    }
    this.setState({ errors })
  }

  render() {
    return (
      <form className='ui form' onSubmit={this.handleSubmit}>
        <h1>Add new game</h1>

        <div className={classnames('field', { error: !!this.state.errors.title })}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name='title'
            value={this.state.title}
            onChange={this.handleChange}
          />
          <span>{this.state.errors.title}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.cover })}>
          <label htmlFor="cover">Cover URL</label>
          <input type="text" id="cover" name='cover'
            value={this.state.cover}
            onChange={this.handleChange}
          />
          <span>{this.state.errors.cover}</span>
        </div>
        {
          this.state.cover !== '' &&
          <div className="field">
            <img src={this.state.cover} alt="cover" className='ui small bordered image' />
          </div>
        }
        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
    );
  }
}

export default GameForm;