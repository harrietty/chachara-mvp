import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import { fetchUserRecordings } from '../actions/content.actions';
import MyRecordingItem from './MyRecordingItem';

import common from '../styles/common';
import app from '../stylesNew/app';

class UserProfile extends React.Component {
  static navigationOptions () {
    return {
      title: 'Recordings'
    };
  }

  componentDidMount () {
    this.props.fetchUserRecordings(this.props.user);
  }

  render () {
    const { recordings } = this.props;
    return (
      <ImageBackground source={require('../img/bg-faded.jpg')} style={{flex: 1}}>
        <View style={app.container}>
          <View style={common.inAppHeaderArea}>
            <Text style={common.header}>My Recordings</Text>
          </View>
          <View style={common.mainArea}>
            {recordings.map((r) => {
              return (
                <MyRecordingItem key={r._id} recording={r} />
              );
            })}
          </View>
        </View>
      </ImageBackground>
    );
  }

  static propTypes = {
    recordings: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    fetchUserRecordings: PropTypes.func.isRequired,
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  recordings: state.userRecordings.recordings
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserRecordings: (user) => {
    dispatch(fetchUserRecordings(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
