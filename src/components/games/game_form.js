import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { saveGame, fetchGame } from '../../actions';
import { Redirect } from 'react-router-dom';

class GameForm extends Component {

  // no need for constructor in ES7
  // https://medium.com/@fakiolinho/reactjs-and-es7-bbedb9862e61
  state = {
    _id: this.props.game ? this.props.game._id : null,
    title: this.props.game ? this.props.game.title : '',
    cover: this.props.game ? this.props.game.cover : '',
    errors: {},
    loading: false,
    done: false
  }

  componentDidMount = () => {
    const id = this.props.match.params.id
    if (id) {
      this.props.fetchGame(id);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    // Once game is fetched, set state with next props
    const { _id, title, cover } = nextProps.game;
    this.setState({ _id, title, cover });
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
      this.setState({ loading: true });
      let { title, cover } = this.state;
      this.props.saveGame({ title, cover }).then(
        () => {
          this.setState({  done: true })
        }, // success
        (err) => err.response.json().then( ({ errors }) => {
          this.setState({
            errors,
            loading: false
          })
        })
      );
    }
  }

  render() {
    const form = (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
        <h1>Add new game</h1>
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

    return (
      <div>
        { this.state.done ? <Redirect to='/games' /> : form }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const gameId = props.match.params.id;
  if (gameId) {
    return {
      game: state.games.find(game => gameId === game._id)
    }
  }
  return {
    game: null
  }
}

export default connect(mapStateToProps,
  { saveGame, fetchGame }
)(GameForm);