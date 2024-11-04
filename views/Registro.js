import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CheckBox from 'expo-checkbox';

<<<<<<< HEAD
// Vista de Registro
=======
>>>>>>> main
const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);

  return (
    <LinearGradient colors={['#0077cc', '#e6f7ff']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../assets/SIGA.png')}
          style={styles.logo}
        />

        <View style={styles.formContainer}>
          <Text style={styles.title}>Registro</Text>


          
            <Text style={styles.lblName}>Nombre: </Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
          

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Apellido Paterno: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Apellido Paterno"
            value={apellidoPaterno}
            onChangeText={setApellidoPaterno}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Apellido Materno: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Apellido Materno"
            value={apellidoMaterno}
            onChangeText={setApellidoMaterno}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Correo: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Telefono: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Usuario: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Crear Usuario"
            value={usuario}
            onChangeText={setUsuario}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Contraseña: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Crear Contraseña"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Confirme contraseña: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Pregunta Secreta: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Pregunta Secreta"
            value={preguntaSecreta}
            onChangeText={setPreguntaSecreta}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Respuesta: </Text>
          </View>
          

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={aceptaPoliticas}
              onValueChange={setAceptaPoliticas}
            />
            <Text style={styles.checkboxLabel}>Acepto las políticas de privacidad</Text>
          </View>

          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>CREAR</Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.loginText1}>Ya tiene cuenta?</Text>
        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => navigation.navigate('Login')}  // Redirigir a la pantalla de login
        >
          <Text style={styles.loginText2}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  logo: {
    width: 140,
    height: 55,
    marginTop: 55,
    marginBottom: 15,
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },



  lbl_Input:{
    flexDirection: 'row',
    alignItems: 'center'

  },
  lblName:{
    fontSize: 18,
  },




  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
  },
  createButton: {
    width: '100%',
    backgroundColor: '#00c853',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    marginTop: 20,
  },
  loginText1: {
    fontSize: 20,
    color: '#fff',
    textDecorationLine: 'none',
    borderBlockColor: 'bold',
    marginBottom: 5,
    textShadowColor: '#000',  // Contorno color
    textShadowOffset: { width: -1, height: 1 },  // Desplazamiento del contorno
    textShadowRadius: 10,  // Grosor
  },
  loginText2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 50,
  },
});

export default RegisterScreen;
