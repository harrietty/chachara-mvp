import React from 'react';
import { Text, View, Modal } from 'react-native';

export default class LanguageSelectModal extends React.Component {
  render () {
    return (
      <Modal
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {}}
        animationType='fade'
      >
        <View style={{backgroundColor: 'rgba(255, 255, 255, 0.7)', flex: 1, alignItems: 'center', justifyContent: 'center'}}>

          <View style={{height: 400, width: '80%', backgroundColor: '#2E2929', opacity: 0.9, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 30}}>modal for {this.props.opt}</Text>
          </View>

        </View>
      </Modal>
    );
  }
}