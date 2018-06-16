import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from './Button';
import { signOut } from '../actions/auth.actions';

class SignOutButton extends React.Component {
  render () {
    return (
      <Button _onPressButton={this.props.signOut}>
        Sign out
      </Button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signOut: () => {
    dispatch(signOut());
  },
});

SignOutButton.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignOutButton);
