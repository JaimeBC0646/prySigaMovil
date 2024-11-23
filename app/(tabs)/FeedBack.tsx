import React from 'react';
import { View, Modal, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const FeedbackModal = ({ visible, onClose }) => {
    return (
      <Modal
        transparent
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={require('../../assets/images/feedback_icon.png')}
              style={styles.feedbackIcon}
            />
            <Text style={styles.modalTitle}>¡Sesión cerrada!</Text>
            <Text style={styles.modalMessage}>Has cerrado sesión correctamente.</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const styles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center' },
    feedbackIcon: { width: 50, height: 50, marginBottom: 10 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    modalMessage: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 20 },
    closeButton: { backgroundColor: '#0077cc', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
    closeButtonText: { color: '#fff', fontSize: 16 },
  });
  export default FeedbackModal;