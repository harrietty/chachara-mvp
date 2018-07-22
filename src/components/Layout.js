import PropTypes from 'prop-types';
import { Text, View, ImageBackground } from 'react-native';
import React from 'react';

import Spinner from '../reusable/Spinner';
import Error from '../reusable/Error';

import app from '../stylesNew/app';

export default class Layout extends React.Component {
  render () {
    const { header, children, loading, error } = this.props;
    if (error) return (
      <Error header={header}>{error}</Error>
    );
    if (loading) return <Spinner />;
    else return (
      <ImageBackground source={require('../img/bg-faded.jpg')} style={{flex: 1}}>
        <View style={app.container}>
          <View style={app.inAppHeaderArea}>
            <Text style={app.header}>{header}</Text>
          </View>
          <View style={app.mainArea}>
            {children}
          </View>
        </View>
      </ImageBackground>
    );
  }

  static propTypes = {
    header: PropTypes.string.isRequired,
    error: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),
    loading: PropTypes.bool.isRequired,
  }
}
