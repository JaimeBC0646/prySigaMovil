import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRouter, useLocalSearchParams } from 'expo-router';



const VerificarCodigoScreen = () => {
    const params = useLocalSearchParams(); // Obtiene los parámetros locales
    const { idUser } = params;
    const [codigo, setCodigo] = useState('');

    const [nuevaPass, setNuevaPass] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const handleVerificarCodigo = async () => {
        //console.log('idUser recibido:', idUser);        
        if (!codigo) {
            Alert.alert('Error', 'Por favor, introduce el código de verificación.');
            return;
        }

        try {
            const response = await fetch('https://sigaemail.host8b.me/codePass_mobile.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idUser, codigo }),
            });

            const data = await response.json();
            //console.log(data)
            if (data.success) {
                //Alert.alert('Éxito', 'El código es válido. Ahora puedes restablecer tu contraseña.',);
                setMostrarFormulario(true);
            } else {
                Alert.alert('Error', 'El código ingresado es incorrecto o ha expirado.');
            }
        } catch (error) {
            console.error('Error al verificar el código:', error);
            Alert.alert('Error', 'Hubo un problema al conectar con el servidor.');
        }
    };

    const handleActualizarPass = async () => {
        if (!nuevaPass || !confirmarContrasena) {
          Alert.alert('Error', 'Por favor, completa todos los campos.');
          return;
        }
    
        if (nuevaPass !== confirmarContrasena) {
          Alert.alert('Error', 'Las contraseñas no coinciden.');
          return;
        }
    
        try {
          const response = await fetch('https://sigaemail.host8b.me/ActualizarContrasena_mobile.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser, nuevaPass }),
          });
    
          const data = await response.json();
          if (data.success) {
            Alert.alert('Éxito', 'Tu contraseña ha sido actualizada con éxito.',
              [
                {
                  text: 'OK',
                  onPress: () => router.replace('/Login'),
                },
              ]
            );
          } else {
            Alert.alert('Error', 'Hubo un problema al actualizar la contraseña.');
          }
        } catch (error) {
          console.error('Error al actualizar la contraseña:', error);
          Alert.alert('Error', 'Hubo un problema al conectar con el servidor.');
        }
      };

    return (
        <LinearGradient colors={['#0077cc', '#e6f7ff']} style={styles.container}>
            <View style={styles.formContainer}>
                {/* Muestra solo el formulario de código o el de contraseña */}
        {!mostrarFormulario ? (
          <>
            <Text style={styles.title}>Verificar Código</Text>
            <Text style={styles.instructions}>
              Ingresa el código que recibiste en tu correo para continuar.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Código de verificación"
              placeholderTextColor="#A9A9B0"
              keyboardType="numeric"
              value={codigo}
              onChangeText={setCodigo}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleVerificarCodigo}>
              <Text style={styles.submitButtonText}>Verificar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Actualizar Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Nueva Contraseña"
              placeholderTextColor="#A9A9B0"
              secureTextEntry
              value={nuevaPass}
              onChangeText={setNuevaPass}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              placeholderTextColor="#A9A9B0"
              secureTextEntry
              value={confirmarContrasena}
              onChangeText={setConfirmarContrasena}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleActualizarPass}>
              <Text style={styles.submitButtonText}>Actualizar Contraseña</Text>
            </TouchableOpacity>
          </>
        )}
            </View>
        </LinearGradient>
    );
};
export default VerificarCodigoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    instructions: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    submitButton: {
        width: '70%',
        backgroundColor: '#00c853',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    passwordForm: {
        marginTop: 30,
    },
});


