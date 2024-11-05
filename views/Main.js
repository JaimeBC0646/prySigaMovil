import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const MainScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (

    <LinearGradient colors={['#0077cc', '#e6f7ff']} style={styles.container}>

      <Text style={styles.welcomeTitle}>BIENVENIDO</Text>

      <Image
        source={require('../assets/SIGA.png')}
        style={styles.logo}
      />

      <Text style={styles.subtitle}>MOVIL</Text>

      <Image
        source={require('../assets/SigaLogo.png')}
        style={styles.icon}
      />

      <Text style={styles.identifyText}>Por favor Identifíquese</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.registerText1}>No tiene cuenta?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')} >
        <Text style={styles.registerText2}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.helpText}>?</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text onPress={() => setModalVisible(false)}>
                <Image
                  source={require('../assets/icon_close.png')}
                  style={styles.modalClose} />
              </Text>

            </View>
            <Text style={styles.modalTitle}>BIENVENIDO A SIGA MOVIL</Text>
            <Text style={styles.modalBody}>
              SIGA Móvil es una aplicación creada exclusivamente para los secretarios de la institución. Su objetivo es facilitar la gestión administrativa, permitiendo a los secretarios visualizar, editar y registrar expedientes de alumnos de forma rápida y eficiente.
            </Text>
          </View>
        </View>
      </Modal>



    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',  // Contorno color
    textShadowOffset: { width: -1, height: 1 },  // Desplazamiento del contorno
    textShadowRadius: 8,  // Grosor
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: '#000',  // Contorno color
    textShadowOffset: { width: -1, height: 1 },  // Desplazamiento del contorno
    textShadowRadius: 5,  // Grosor
  },
  logo: {
    width: 120,
    height: 50,
    marginTop: 10,
    marginBottom: 5,
  },
  icon: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  identifyText: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 40,
    textShadowColor: '#000',  // Contorno color
    textShadowOffset: { width: -1, height: 1 },  // Desplazamiento del contorno
    textShadowRadius: 5,  // Grosor
  },
  loginText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#00000',
    marginBottom: 10,
  },
  registerText1: {
    fontSize: 20,
    color: '#fff',
    textDecorationLine: 'none',
    borderBlockColor: 'bold',
    marginBottom: 10,
    textShadowColor: '#000',  // Contorno color
    textShadowOffset: { width: -1, height: 1 },  // Desplazamiento del contorno
    textShadowRadius: 5,  // Grosor
  },
  registerText2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00000',
    marginBottom: 40,
  },


  helpButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    width: 40,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#00000',
  },


  // Estilos del modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    alignItems: 'flex-end',
  },
  modalClose: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalBody: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },

});

export default MainScreen;