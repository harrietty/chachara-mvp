import React from 'react';
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
  }
});

export default connect(null, mapDispatchToProps)(SignOutButton);
