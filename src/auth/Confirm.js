import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { confirmSignUp } from '../actions';

class Confirm extends React.Component {
  state = {
    code: ''
  };

  handleChange = (code) => {
    this.setState({code});
  }
  
  confirm = () => {
    const username = this.props.navigation.getParam('username');
    this.props.confirmSignUp(username, this.state.code);
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  renderError = () => {
    return (
      <Text>{this.props.error}</Text>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Please paste the code we have emailed you:</Text>
        <TextInput
          style={styles.input}
          placeholder='######'
          onChangeText={this.handleChange}
        />
        {this.props.error && this.renderError()}
        <Button title='Confirm' onPress={this.confirm} />
        <Button title='back to signup' onPress={this.goBack} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  input: {
    height: 40,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    padding: 3,
    margin: 3,
    width: 300,
    backgroundColor: 'white'
  }
});

const mapStateToProps = (state) => ({
  error: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
  confirmSignUp: (username, code) => {
    dispatch(confirmSignUp(username, code));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);