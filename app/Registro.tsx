import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Checkbox } from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';


const RegisterScreen = () => {

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    password: '',
    confirmPassword: '',
    preguntaSecreta: '',
    respuestaSecreta: '',
    telefono: '',
    usuario: '',
  });
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);


  const handleRegister = async () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.apellidoPaterno || !nuevoUsuario.apellidoMaterno || !nuevoUsuario.email || !nuevoUsuario.password ||
      !nuevoUsuario.confirmPassword || !nuevoUsuario.preguntaSecreta || !nuevoUsuario.respuestaSecreta || !nuevoUsuario.telefono || !nuevoUsuario.usuario) {
      Alert.alert('Campos incompletos', 'Por favor rellene cada campo');
    } else if (!aceptaPoliticas) {
      Alert.alert('Políticas de privacidad', 'Debe aceptar las políticas de privacidad para registrarse.');
    } else {
      try {
        //console.log("\n\n\n Response server 1: ", data, '\n\n\n');
        //console.log("Datos a registrar:", nuevoUsuario);
        const response = await fetch('https://sigaemail.host8b.me/registro_mobile.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoUsuario),
        });

        const data = await response.json();
        //console.log("\n\n\n Response server : ", data, '\n\n\n');

        if (data.success) {
          Alert.alert('Registro exitoso', 'Usuario registrado correctamente');
          router.navigate('/Login');
        } else {
          Alert.alert('Registro fallido', data.message);
        }
      } catch (error) {
        console.error('Error durante el registro:', error);
        Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
      }
    }
  };



  return (
    <LinearGradient colors={['#0077cc', '#e6f7ff']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../assets/images/SIGA.png')}
          style={styles.logo}
        />

        <View style={styles.formContainer}>
          <Text style={styles.title}>Registro</Text>

          <Text style={styles.lblName}>Nombre: </Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre's"
            value={nuevoUsuario.nombre}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, nombre: text })}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Apellido Paterno: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Apellido Paterno"
            value={nuevoUsuario.apellidoPaterno}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, apellidoPaterno: text })}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Apellido Materno: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Apellido Materno"
            value={nuevoUsuario.apellidoMaterno}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, apellidoMaterno: text })}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Correo: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={nuevoUsuario.email}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, email: text })}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Telefono: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={nuevoUsuario.telefono}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, telefono: text })}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Usuario: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Crear Usuario"
            value={nuevoUsuario.usuario}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, usuario: text })}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Contraseña: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Crear Contraseña"
            secureTextEntry={true}
            value={nuevoUsuario.password}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, password: text })}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Confirme contraseña: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            secureTextEntry={true}
            value={nuevoUsuario.confirmPassword}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, confirmPassword: text })}
          />

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Pregunta Secreta: </Text>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={nuevoUsuario.preguntaSecreta}  // Valor actualmente seleccionado
              onValueChange={(itemValue) =>
                setNuevoUsuario({ ...nuevoUsuario, preguntaSecreta: itemValue })  // Actualiza el estado con la opción seleccionada
              }
            >
              <Picker.Item style={styles.pickerContainer} label="Seleccione una pregunta" value="" />
              <Picker.Item style={styles.pickerContainer} label="¿Cómo se llamaba tu primera mascota?" value="1" />
              <Picker.Item style={styles.pickerContainer} label="¿Cuál es tu comida favorita?" value="2" />
              <Picker.Item style={styles.pickerContainer} label="¿Cuál es tu color favorito?" value="3" />
              <Picker.Item style={styles.pickerContainer} label="¿Cómo se llama tu cantante favorito?" value="4" />
            </Picker>
          </View>

          <View style={styles.lbl_Input}>
            <Text style={styles.lblName}>Respuesta: </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Respuesta Secreta"
            value={nuevoUsuario.respuestaSecreta}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, respuestaSecreta: text })}
          />


          <View style={styles.checkboxContainer}>
            <Checkbox
              value={aceptaPoliticas}
              onValueChange={() => { setAceptaPoliticas(true) }} />

            <Text style={styles.checkboxLabel}>Acepto las políticas de privacidad</Text>
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleRegister}>
            <Text style={styles.createButtonText}>CREAR</Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.loginText1}>Ya tiene cuenta?</Text>
        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => router.replace('/Login')}  // Redirigir a la pantalla de login
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



  pickerContainer: {
    fontSize: 13,
    width: '80%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginBottom: 15,
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



  lbl_Input: {
    flexDirection: 'row',
    alignItems: 'center'

  },
  lblName: {
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


  recaptchaButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#0077cc',
    borderRadius: 10,
    alignItems: 'center',
  },
  recaptchaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

});

export default RegisterScreen;
