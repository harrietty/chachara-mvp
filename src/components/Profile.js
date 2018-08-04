import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { signOut } from '../actions/auth.actions';

import LanguageFlagCircle from './Profile/LanguageFlagCircle';
import AddMore from './Profile/AddMore';
import LanguageSelectModal from './Profile/LanguageSelectModal';

import styles from '../stylesNew/profile';
import app from '../stylesNew/app';

class Profile extends React.Component {
  static navigationOptions () {
    return {
      title: 'Profile',
    };
  }
  
  state = {
    learningModalShowing: false,
    speaksModalShowing: false
  }

  toggleModal = (opt) => () => {
    this.setState({
      [`${opt}ModalShowing`]: !this.state[`${opt}ModalShowing`]
    });
  }

  render () {
    const { profile } = this.props;
    return (
      <View style={app.container}>
        <LanguageSelectModal
          selectedLangs={profile.languages_spoken}
          toggleModal={this.toggleModal('speaks')}
          visible={this.state.speaksModalShowing}
          opt='speaks'
        />
        <LanguageSelectModal
          selectedLangs={profile.languages_learning}
          toggleModal={this.toggleModal('learning')}
          visible={this.state.learningModalShowing}
          opt='learning'
        />

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
            <Image source={require('../img/harriet.jpg')} style={{width: 240, height: 240, borderRadius: 120, borderWidth: 3, borderColor: 'white'}} />
            <Text style={{fontFamily: 'AvenirNext-Regular', textAlign: 'center', fontSize: 30, color: '#242312', fontWeight: '500'}}>
              {profile.name || 'Harriet Ryder'}
            </Text>

            <Text style={{fontFamily: 'AvenirNext-Regular', textAlign: 'center', fontSize: 18, color: '#595959'}}>@{profile.username}</Text>
          </View>

          <View style={{flex: 2, justifyContent: 'space-around'}}>
            <View>
              <Text style={{fontFamily: 'AvenirNext-Regular', fontSize: 30, marginBottom: 20}}>Speaks:</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', minWidth: 100}}>
                {profile.languages_spoken.map((lang, i) => <LanguageFlagCircle language={lang} key={i} />)}
                <AddMore onPress={this.toggleModal('speaks')} />
              </View>
            </View>
            <View>
              <Text style={{fontFamily: 'AvenirNext-Regular', fontSize: 30, marginBottom: 20}}>Learning:</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', minWidth: 100}}>
                {profile.languages_learning.map((lang, i) => <LanguageFlagCircle language={lang} key={i} />)}
                <AddMore onPress={this.toggleModal('learning')} />
              </View>
            </View>
          </View>
        </View>
      </View>
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
