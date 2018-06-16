import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { signOut } from '../actions';

class SignOutButton extends React.Component {
  render () {
    return (
      <Button
        title='Sign out'
        onPress={this.props.signOut}
      />
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
