import { t } from 'i18next';
import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';

const options = [
  {label: 'English', value: 'en'},
  {label: 'हिन्दी', value: 'hi'},
  {label: 'मैथिली', value: 'mi'},
];
const LanguageModal = ({isVisible, onClose, onLanguageSelect}) => {
  
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('select_language')}</Text>
          {options.map((language, index) => (
            <TouchableOpacity
              key={index}
              style={styles.languageButton}
              onPress={() => onLanguageSelect(language.value)}>
              <Text style={styles.languageButtonText}>{language.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>{t('Cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  languageButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  languageButtonText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: 'red',
  },
});
