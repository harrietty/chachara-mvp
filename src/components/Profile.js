import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { signOut } from '../actions/auth.actions';

import styles from '../stylesNew/profile';
import app from '../stylesNew/app';

class Profile extends React.Component {
  static navigationOptions () {
    return {
      title: 'Profile',
    };
  }

  render () {
    const { profile } = this.props;
    return (
      <ImageBackground source={require('../img/bg-faded.jpg')} style={{flex: 1}}>
        <View style={app.container}>
          <View style={app.inAppHeaderArea}>
            <Text style={app.header}>Profile</Text>
            <View style={{backgroundColor: '#FFA600', borderRadius: 25, padding: 5}}>
              <TouchableOpacity onPress={this.props.signOut}>
                <Text style={{paddingLeft: 10, paddingRight: 10, fontFamily: 'AvenirNext-Regular', fontSize: 26, color: '#434545', textAlign: 'center'}}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={app.mainArea}>
            <View style={{flex: 2}}>
              <Image source={require('../img/harriet.jpg')} style={{width: 240, height: 240, borderRadius: 120}} />
              <Text style={{fontFamily: 'AvenirNext-Regular', textAlign: 'center', fontSize: 30, color: '#242312', fontWeight: '500'}}>
                {profile.name || 'Harriet Ryder'}
              </Text>

              <Text style={{fontFamily: 'AvenirNext-Regular', textAlign: 'center', fontSize: 18, color: '#595959', paddingLeft: 20}}>@{profile.username}</Text>
            </View>

            <View style={{flex: 2, backgroundColor: 'blue'}}>
              <Text>langs and bio</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
  }
}

const mapStateToProps = ({profile, auth}) => ({
  profile: {
    ...profile,
    username: auth.user.username
  }
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => {
    dispatch(signOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
