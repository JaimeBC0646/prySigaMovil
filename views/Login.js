import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient colors={['#0077cc', '#e6f7ff']} style={styles.container}>
      <Image
        source={require('../assets/SIGA.png')}
        style={styles.logo}
      />

      
      <View style={styles.formContainer}>
        <Text style={styles.title}>INICIAR SESIÓN</Text>

        <Image
          source={require('../assets/icon_User.png')}
          style={styles.iconUser}
        />

        <Text style={styles.lblText}>USUARIO</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#000"
          value={username}
          onChangeText={setUsername}
        />
        
        <Text style={styles.lblText}>CONTRASEÑA</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#000"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('SesionUser')}>
          <Text style={styles.loginButtonText}>ACCEDER</Text>
        </TouchableOpacity>

        {/* Enlace para recuperar contraseña */}
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>
            No recuerdas tu contraseña? Recuperar por Pregunta Secreta
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.registerText1}>No tiene cuenta?</Text>
      <TouchableOpacity
        style={styles.registerContainer}
        onPress={() => navigation.navigate('Registro')}  // Redirigir registro
      >
        <Text style={styles.registerText2}>Registrarse</Text>
      </TouchableOpacity>
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
  logo: {
    width: 150,
    height: 65,
    marginBottom: 25,
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  iconUser: {
    width: 100,
    height: 99,
    marginBottom: 20,
  },

  lblText:{
    fontSize: 25,
    fontWeight: 'bold',
  },

  input: {
    width: '80%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 30,
    borderBottomWidth: 5,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    width: '50%',
    backgroundColor: '#00c853',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationLine: 'none',
  },
  registerContainer: {
    marginTop: 10,
  },
  registerText1: {
    fontSize: 25,
    color: '#fff',
    textDecorationLine: 'none',
    textShadowColor: '#000',  // Contorno color
    textShadowOffset: { width: -1, height: 1 },  // Desplazamiento del contorno
    textShadowRadius: 5,  // Grosor
  },
  registerText2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
});

export default LoginScreen;
