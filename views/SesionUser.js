import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderLogos from '../components/HeaderLogos';

<<<<<<< HEAD
// Vista de Sesion de usuario
=======
>>>>>>> main
const SessionUser = ({ navigation }) => {
  return (
    <LinearGradient colors={['#0077cc', '#99ddff']} style={styles.container}>

      <HeaderLogos />

      <View style={styles.viewMessagge}><Text style={styles.welcomeMessage}>BIENVENIDO SEC. JUAN HERNANDEZ HERNANDEZ</Text></View>

      <Text style={styles.selectOption}>SELECCIONE UNA OPCION</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Expedientes')}>
          <Image source={require('../assets/icon_expediente.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>EXPEDIENTES</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Main')}>
          <Image source={require('../assets/icon_logout.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>CERRAR SESION</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.contentSection}>
        <Text style={styles.contentTitle}>CONTENIDO</Text>
        <View style={styles.contentInfo}>
          <View style={styles.contentBox}>
            <Text style={styles.contentHeading}>EXPEDIENTES</Text>
            <Text style={styles.contentDescription}>
              Permite a los secretarios ver, editar y registrar expedientes de alumnos, incluyendo documentos como constancias, boletas y certificados.
            </Text>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.contentHeading}>DIARIO DE EVENTOS</Text>
            <Text style={styles.contentDescription}>
              Herramienta para registrar y organizar eventos importantes de la escuela, permitiendo un fácil seguimiento cronológico.
            </Text>
          </View>
        </View>
      </View>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    alignItems: 'center',
    
  },
  



  viewMessagge:{
    backgroundColor: 'white',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 15,
    textAlign: 'center',
  },


  selectOption: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 20,
  },
  optionButton: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  optionIcon: {
    width: 80,
    height: 80,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  contentSection: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  contentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentBox: {
    width: '45%',
  },
  contentHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contentDescription: {
    fontSize: 14,
    textAlign: 'justify',
  },
});

export default SessionUser;
