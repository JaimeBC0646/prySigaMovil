import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const RecuperarPasswordScreen = () => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para generar un código de verificación aleatorio
  const generarCodigo = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };



  const handleRecuperar = async () => {
    if (!email) {
      Alert.alert('Error', 'Por favor, ingrese su correo electrónico.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://sigaemail.host8b.me/recuperarContra_mobile.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        console.log('data: ', data)
        const idUser = data.data[0].iduser;
        //console.log(idUser)
        const codigoVerificacion = generarCodigo();

        const responseCode = await fetch('https://sigaemail.host8b.me/updCodeUser_mobile.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ codigoVerificacion, idUser }),
        });
        const dataCode = await responseCode.json();
        console.log('dataCode: ', dataCode)
        if (dataCode.success) {
          console.log('dataCode: ', dataCode)
          console.log('codigo de la cuenta enviado a bd')
          
          const sendGridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
              Authorization: `Bearer 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`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              personalizations: [
                {
                  to: [{ email }],
                  subject: 'Código de recuperación de contraseña',
                },
              ],
              from: { email: 'hosting8b@gmail.com' }, // Cambia esto por tu correo
              content: [
                {
                  type: 'text/plain',
                  value: `Este es tu código de recuperación: ${codigoVerificacion}. \n\n
                  No compartas nunca tus contraseñas ni codigos. Si tu no has solicitado este codigo, haz caso omiso a este correo y actualiza tu informacion`,
                },
              ],
            }),
          });
          if (sendGridResponse.status === 202) {
            console.log('codigo enviado al correo de la cuenta')
            router.push(`/ActualizarContra?idUser=${idUser}`);
          } else {
            console.log(sendGridResponse)
            Alert.alert('Error', 'Hubo un problema al enviar el codigo.');
          }
          

        }
        else { Alert.alert('Error bd', dataCode.message); }



      } else {
        console.log(data.message);
        Alert.alert('Error', data.message);
      }


    } catch (error) {
      console.error('Error al recuperar contraseña:', error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#0077cc', '#e6f7ff']} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Recuperar Contraseña</Text>
        <Text style={styles.instructionText}>
          Ingresa tu correo electrónico para recibir un código de recuperación.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#A9A9B0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.recuperarButton}
          onPress={handleRecuperar}
          disabled={loading}
        >
          <Text style={styles.recuperarButtonText}>
            {loading ? 'Enviando...' : 'Recuperar Contraseña'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/Login')}>
          <Text style={styles.returnLogin}>
            Volver
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
export default RecuperarPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  instructionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  recuperarButton: {
    width: '100%',
    backgroundColor: '#0077cc',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  recuperarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  returnLogin:{
    marginTop: 20,
    fontSize: 20,
  }
});


