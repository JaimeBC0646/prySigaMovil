import React, { useState, useEffect } from 'react';
import { TextInput, View, TouchableOpacity, Text, Alert, Image, StyleSheet } from 'react-native';

const FormSolicitarExpediente = ({ expediente, onClose }) => {
  {/*
  useEffect(() => {
    console.log("Datos del expediente recibido:", expediente);
  }, [expediente]);
   */}

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre_responsable: '',
    nombre_solicitante: '',
    motivo: '',
  });

  // Función para enviar la solicitud
  const enviarSolicitud = async () => {
    if (formData.nombre_responsable == '' || formData.nombre_solicitante == '' || formData.motivo == '') {
      Alert.alert('Campos incompletos', 'Porfavor rellene cada campo')
    }
    else {
      try {
        // Combina los datos del expediente y el formulario en un solo objeto
        const data = {
          ...expediente,
          ...formData,
        };

        // Realiza la solicitud al backend
        const response = await fetch('https://sigaemail.host8b.me/solicitudes_expedientes_mobile.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Esto indica que los datos se enviarán en formato JSON
          },
          body: JSON.stringify(data), // Convertir el objeto a JSON antes de enviarlo
        });

        const responseData = await response.json(); // Procesar la respuesta JSON

        //console.log("Expediente: ",expediente)
        //console.log("formData: ",formData)
        //console.log("Data: ",data)
        //console.log("Respuesta del servidor: ", responseData);

        if (response.status === 200) {
          Alert.alert('Solicitud enviada', responseData.message || 'La solicitud se envió correctamente');
          onClose();
        } else {
          Alert.alert('Error', responseData.message || 'Hubo un problema al enviar la solicitud');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'No se pudo enviar la solicitud');
      }
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require('../assets/images/icon_close.png')}
                style={styles.modalClose}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalTitle}>Solicitar Expediente</Text>
          <Text> {expediente ? `Expediente de ${expediente.Alumno}` : 'Cargando expediente...'} </Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del Responsable"
            placeholderTextColor="#666"
            value={formData.nombre_responsable}
            onChangeText={(text) => setFormData({ ...formData, nombre_responsable: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre del Solicitante"
            placeholderTextColor="#666"
            value={formData.nombre_solicitante}
            onChangeText={(text) => setFormData({ ...formData, nombre_solicitante: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Motivo de la Solicitud"
            placeholderTextColor="#666"
            value={formData.motivo}
            onChangeText={(text) => setFormData({ ...formData, motivo: text })}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.solicitarButton} onPress={enviarSolicitud}>
              <Text style={styles.solicitarButtonText}>Solicitar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelarButton} onPress={onClose}>
              <Text style={styles.cancelarButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },

  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc',
  },

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
    justifyContent: 'center'
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
    justifyContent: 'center',
    textAlign: 'center',
  },
  modalBody: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  solicitarButton: {
    backgroundColor: '#0077cc',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  solicitarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelarButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelarButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FormSolicitarExpediente;