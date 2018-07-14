import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import { fetchUserRecordings, deleteFromS3 } from '../actions/content.actions';
import MyRecordingItem from './MyRecordingItem';
import Spinner from '../reusable/Spinner';
import Error from '../reusable/Error';

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
    const { recordings, deleteFromS3, user, loading, error } = this.props;
    if (loading) return (
      <Spinner />
    );
    else if (error) return (
      <Error header='My Recordings'>{error}</Error>
    );
    else return (
      <ImageBackground source={require('../img/bg-faded.jpg')} style={{flex: 1}}>
        <View style={app.container}>
          <View style={common.inAppHeaderArea}>
            <Text style={common.header}>My Recordings</Text>
          </View>
          <View style={common.mainArea}>
            {recordings.map((r) => {
              return (
                <MyRecordingItem key={r._id} recording={r} deleteFromS3={deleteFromS3} user={user} />
              );
            })}
          </View>
        </View>
      </ImageBackground>
    );
  }

  static propTypes = {
    recordings: PropTypes.array.isRequired,
    error: PropTypes.string,
    user: PropTypes.object.isRequired,
    fetchUserRecordings: PropTypes.func.isRequired,
    deleteFromS3: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  recordings: state.userRecordings.recordings,
  loading: state.userRecordings.loading,
  error: state.userRecordings.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserRecordings: (user) => {
    dispatch(fetchUserRecordings(user));
  },
  deleteFromS3: (recordingUrl, recordingId, user) => {
    dispatch(deleteFromS3(recordingUrl, recordingId, user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
