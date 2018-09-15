import React, { Component } from 'react';
import classnames from 'classnames';

export default class GameForm extends Component {
  // no need for constructor in ES7
  // https://medium.com/@fakiolinho/reactjs-and-es7-bbedb9862e61
  state = {
    _id: this.props.game ? this.props.game._id : null,
    title: this.props.game ? this.props.game.title : '',
    cover: this.props.game ? this.props.game.cover : '',
    errors: {},
    loading: false
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

    let isValid = Object.keys(errors).length === 0;

    if (isValid) {
      let { _id, title, cover } = this.state;
      this.setState({ loading: true });
      this.props.saveGame({ _id, title, cover })
        .catch((err) => {
          err.response.json().then(({ errors} ) => {
            this.setState({
              errors,
              loading: false
            });
          })
        });
    }
  }

  render() {
    return (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
        {
          !!this.state.errors.global &&
          <div className="ui negative message">
            <p>{this.state.errors.global}</p>
          </div>
        }
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