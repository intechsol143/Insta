import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const ModalOverlay = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.overlay}
      onPress={onPress}
      activeOpacity={1} // Prevents the TouchableOpacity from becoming semi-opaque on touch
    >
      <View style={styles.transparentBackground} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // Cover the entire screen
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Place it above other UI components
  },
  transparentBackground: {
    backgroundColor: 'transparent', // Make the view transparent
  },
});

export default ModalOverlay;
