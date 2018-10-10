import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveGame, fetchGame, updateGame } from '../../actions';
import { Redirect } from 'react-router-dom';
import GameForm from './GameForm';

class GameFormPage extends Component {

  state = {
    redirect: false
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

  saveGame = ({ _id, title, cover }) => {
    // return promise and catch err in form,
    // where errors are displayed
    if (_id) { // existing record
      return this.props.updateGame({ _id, title, cover }).then(
        () => {
          this.setState({ redirect: true })
        }
      );
    } else { // new record
      return this.props.saveGame({ title, cover }).then(
        () => {
          this.setState({ redirect: true })
        }
      );
    }
  }

  render() {
    const pageTitle = this.props.match.params.id ? 'Edit Game' : 'New Game';
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to='/games' /> :
          <div>
            <h1>{pageTitle}</h1>
            <GameForm
              game={this.props.game}
              saveGame={this.saveGame} />
          </div>
        }
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
  { saveGame, fetchGame, updateGame }
)(GameFormPage);