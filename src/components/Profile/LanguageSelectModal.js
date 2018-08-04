import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal } from 'react-native';

import Button from '../../reusable/Button';
import SupportedLangChoice from './SupportedLangChoice';
import { supportedLanguages } from '../../general-config';
import app from '../../stylesNew/app';

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
            <Text style={app.whiteText}>{this.props.header}</Text>
            <View style={{width: '100%',flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}}>
              {supportedLanguages.map((language, i) => {
                let selected = this.props.selectedLangs.includes(language) ? true : false;
                return <SupportedLangChoice toggleLanguageChoice={this.props.toggleLanguageChoice} key={i} language={language} selected={selected} />;
              })}
            </View>
            <Button _onPressButton={this.props.toggleModal}>
              Save
            </Button>
          </View>
        </View>
      </Modal>
    );
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    opt: PropTypes.string.isRequired,
    selectedLangs: PropTypes.array.isRequired,
    toggleLanguageChoice: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired,
  }
}