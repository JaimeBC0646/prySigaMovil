import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderLogos from '../components/HeaderLogos';

const ExpedientesScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedExpediente, setSelectedExpediente] = useState(null); // desplegable
  const [expedientes, setExpedientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSolicitudVisible, setModalSolicitudVisible] = useState(false);

  // Obtiene data del Webservice
  const fetchExpedientes = async () => {
    try {
      const response = await fetch('https://sigaemail.host8b.me/expedientes.php');
      const data = await response.json(); // Asumiendo que el response es JSON
      setExpedientes(data); // Guardamos los datos en el estado
    } catch (error) {
      console.error('Error fetching expedientes:', error);
    }
  };

  // Llama la funcion 'fetchExpedientes' cada que se cargue el componente
  useEffect(() => {
    fetchExpedientes();
  }, []);

  // Renderiza cada expediente
  const renderExpediente = ({ item, index }) => (
    <View>
      <TouchableOpacity
        style={styles.expedienteButton}
        onPress={() => setSelectedExpediente(selectedExpediente === index ? null : index)} // Toggle del menú de opciones
      >
        <Text style={styles.expedienteText}>{item.Alumno}</Text>

        <Image
          style={styles.directionArrow}
          source={
            selectedExpediente === index
              ? require('../assets/display_upArrow.png')
              : require('../assets/display_downArrow.png')
          }
        />
      </TouchableOpacity>

      {selectedExpediente === index && (
        <View style={styles.optionMenu}>
          <TouchableOpacity style={styles.optionButton} onPress={() => {/* Visualizar el expediente */ }}>
            <Text style={styles.optionText}>Ver</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => {/* Editar el expediente */ }}>
            <Text style={styles.optionText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => setModalSolicitudVisible(true)}>
            <Text style={styles.optionText}>Solicitar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <LinearGradient colors={['#0077cc', '#e6f7ff']} style={styles.container}>
      <HeaderLogos />

      <View style={styles.header}>
        <View style={styles.viewMessagge}>
          <Text style={styles.welcomeMessage}>BIENVENIDO SEC. JUAN HERNANDEZ HERNANDEZ</Text>
        </View>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.actionText}>ACCIONES</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor="#333"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <Text style={styles.title}>EXPEDIENTES</Text>

      <FlatList
        data={expedientes}
        renderItem={renderExpediente}
        keyExtractor={(item, index) => index.toString()}
        style={styles.expedienteList}
      />

      {/* Modal de Acciones */}
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
            <Text style={styles.modalTitle}>SELECCIONE LA ACCION A REALIZAR</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Expedientes')}>
                <Image source={require('../assets/icon_expediente.png')} style={styles.optionIcon} />
                <Text style={styles.optionText}>REGISTRAR NUEVO EXPEDIENTE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Main')}>
                <Image source={require('../assets/icon_logout.png')} style={styles.optionIcon} />
                <Text style={styles.optionText}>CERRAR SESION</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Solicitudes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSolicitudVisible}
        onRequestClose={() => setModalSolicitudVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text onPress={() => setModalSolicitudVisible(false)}>
                <Image
                  source={require('../assets/icon_close.png')}
                  style={styles.modalClose}
                />
              </Text>
            </View>
            <Text style={styles.modalTitle}>Solicitar Expediente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Responsable"
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre del Solicitante"
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              placeholder="Motivo de la Solicitud"
              placeholderTextColor="#666"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.solicitarButton}>
                <Text style={styles.solicitarButtonText}>Solicitar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelarButton} onPress={() => setModalSolicitudVisible(false)}>
                <Text style={styles.cancelarButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,

  },


  viewMessagge: {
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




  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: '65%',
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  expedienteList: {
    flex: 1,
    paddingHorizontal: 20,
  },


  expedienteButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 10,
  },
  expedienteText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  directionArrow: {
    width: 19,
    height: 12,
  },




  // Estilos del modal de acciones
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





  optionsContainer: {
    flexDirection: 'row',
  },
  optionButton: {
    width: '40%',
    marginHorizontal: 20,

    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },

  optionIcon: {
    width: 80,
    height: 80,
  },



  optionText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
    textAlign: 'center',
  },



  // Desplegable de opciones
  optionMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: '#0077cc',
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0077cc',
  },







  // Estilos del modal de solicitud
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
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

export default ExpedientesScreen;
