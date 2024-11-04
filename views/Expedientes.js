import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, FlatList, Modal, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderLogos from '../components/HeaderLogos';

const ExpedientesScreen = ({ navigation }) => {
  const [search, setSearch] = useState(''); //Sin funcionalidad
  const [selectedExpediente, setSelectedExpediente] = useState(null); // desplegable
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;
  const [expedientes, setExpedientes] = useState([]);

  // Estados de modal (visibilidad)
  const [modalAcciones, setModalAcciones] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalSolicitud, setModalSolicitud] = useState(false);

  // Estados para agregar y editar expedientes
  const [modalAgregar, setModalAgregar] = useState(false);
  const [nuevoExpediente, setNuevoExpediente] = useState({
    Clave: '',
    cicloEsc: '',
    Alumno: '',
    Grado: '',
    Grupo: '',
    Resguardo: '',
    Caja: '',
    Expediente: '',
    archivo: '',
  });


  // Obtiene data del Webservice
  const fetchExpedientes = async () => {
    try {
      const response = await fetch('https://sigaemail.host8b.me/expedientes.php');
      const data = await response.json(); // Asumiendo que el response es JSON
      setExpedientes(data); // Guardamos los datos en el estado
      setSelectedExpediente(null);
    } catch (error) {
      console.error('Error fetching expedientes:', error);
    }
  };

  // Llama la funcion 'fetchExpedientes' cada que se cargue el componente
  useEffect(() => {
    fetchExpedientes();
  }, []);

  // Avanzar en la lista
  const nextItems = () => {
    if (startIndex + itemsPerPage < expedientes.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };
  // Retrocede en la lista
  const prevItems = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };




  // Renderiza expedientes
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
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              setModalVer(true);  // Muestra el modal de detalles
              setSelectedExpediente(item);  // Establece el expediente seleccionado
            }}
          >
            <Text style={styles.optionText}>Ver</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => setModalSolicitud(true)}>
            <Text style={styles.optionText}>Solicitar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
  // Añadir expedientes
  const handleAgregarExpediente = async () => {
    if (nuevoExpediente.Clave == '' || nuevoExpediente.cicloEsc == '' || nuevoExpediente.Alumno == '' || nuevoExpediente.Grado == '' || nuevoExpediente.Grupo == ''
      || nuevoExpediente.Resguardo == '' || nuevoExpediente.Caja == '' || nuevoExpediente.Expediente == '' || nuevoExpediente.archivo == '') {
      Alert.alert('Campos incompletos', 'Porfavor rellene cada campo')
    }
    else {
      try {
        console.log("Datos a registrar:", nuevoExpediente);

        const response = await fetch('https://sigaemail.host8b.me/RegistroExp_mobile.php', {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoExpediente),
        });

        // Verificamos si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          Alert.alert('Expediente cargado', 'Datos registrados correctamente')
          setModalAgregar(false);
          fetchExpedientes();
        } else {
          console.error('Error al agregar el expediente:', data.message);
        }
      } catch (error) {
        console.error('Error al agregar el expediente:', error);
      }
    }
  };

  // Edición expedientes
  const handleEditExpediente = async () => {
    try {

      const response = await fetch('https://sigaemail.host8b.me/updateExpediente.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedExpediente),
      });

      const data = await response.json();

      //console.log('data: ', data)
      if (data.success) {
        Alert.alert('Registro actualizado', data.message);
        setModalEdit(false);
        setModalVer(false);
        fetchExpedientes();

      } else {
        Alert.alert('Edicion fallida', data.message);
      }
    } catch (error) {
      console.error('Error al editar el expediente:', error);
      Alert.alert('Error', 'No se pudo actualizar el expediente');
    }
  };



  return (
    <LinearGradient colors={['#0077cc', '#e6f7ff']} style={styles.container}>
      <HeaderLogos />

      <View style={styles.header}>
        <View style={styles.viewMessagge}>
          <Text style={styles.welcomeMessage}>BIENVENIDO SEC. JUAN HERNANDEZ HERNANDEZ</Text>
        </View>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton} onPress={() => setModalAcciones(true)}>
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

      <FlatList data={expedientes.slice(startIndex, startIndex + itemsPerPage)}
        renderItem={renderExpediente}
        keyExtractor={(item, index) => index.toString()}
        style={styles.expedienteList}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={() => { prevItems; }} disabled={startIndex === 0}>
          <Text style={[styles.paginationButton, startIndex === 0 && styles.disabledButton]}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextItems} disabled={startIndex + itemsPerPage >= expedientes.length}>
          <Text style={[styles.paginationButton, startIndex + itemsPerPage >= expedientes.length && styles.disabledButton]}>Siguiente</Text>
        </TouchableOpacity>
      </View>



      {/* MODALES */}

      {/* Modal de Acciones */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAcciones}
        onRequestClose={() => setModalAcciones(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text onPress={() => setModalAcciones(false)}>
                <Image
                  source={require('../assets/icon_close.png')}
                  style={styles.modalClose} />
              </Text>
            </View>
            <Text style={styles.modalTitle}>SELECCIONE LA ACCION A REALIZAR</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={() => setModalAgregar(true)}>
                <Image source={require('../assets/icon_expediente.png')} style={styles.optionIcon} />
                <Text style={styles.actionText}>AGREGAR NUEVO EXPEDIENTE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Main')}>
                <Image source={require('../assets/icon_logout.png')} style={styles.optionIcon} />
                <Text style={styles.optionText}>CERRAR SESION</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Visualización */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVer}
        onRequestClose={() => setModalVer(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text onPress={() => setModalVer(false)}>
                <Image
                  source={require('../assets/icon_close.png')}
                  style={styles.modalClose}
                />
              </Text>
            </View>
            <Text style={styles.modalTitle}>Detalle del Expediente</Text>


            {selectedExpediente && (
              <View style={styles.expedienteDetailsContainer}>
                <Text style={styles.expedienteField}>
                  <Text style={styles.expedienteFieldLabel}>Clave:</Text> {selectedExpediente.Clave}
                </Text>
                <Text style={styles.expedienteField}>
                  <Text style={styles.expedienteFieldLabel}>Ciclo escolar:</Text> {selectedExpediente.cicloEsc}
                </Text>
                <Text style={styles.expedienteField}>
                  <Text style={styles.expedienteFieldLabel}>Alumno:</Text> {selectedExpediente.Alumno}
                </Text>
                <Text style={styles.expedienteField}>
                  <Text style={styles.expedienteFieldLabel}>Grado y Grupo:</Text> {selectedExpediente.Grado} {selectedExpediente.Grupo}
                </Text>
                <Text style={styles.expedienteField}>
                  <Text style={styles.expedienteFieldLabel}>Resguardo:</Text> {selectedExpediente.Resguardo}
                </Text>
                <Text style={styles.expedienteField}>
                  <Text style={styles.expedienteFieldLabel}>Caja:</Text> {selectedExpediente.Caja}
                </Text>
                <Text style={styles.expedienteField}>
                  <Text style={styles.expedienteFieldLabel}>Expediente:</Text> {selectedExpediente.Expediente}
                </Text>
                <Text style={styles.expedienteField}>
                  <Text style={styles.expedienteFieldLabel}>Archivo:</Text> {selectedExpediente.archivo}
                </Text>
              </View>



            )}

            {/* Botón de edición */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                // Pasando selectedExpediente para prellenar el formulario de edición
                setSelectedExpediente(selectedExpediente);
                setModalEdit(true);
              }}
            >
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* Modal de Edición */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEdit}
        onRequestClose={() => setModalEdit(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text onPress={() => setModalEdit(false)}>
                <Image
                  source={require('../assets/icon_close.png')}
                  style={styles.modalClose}
                />
              </Text>
            </View>
            <Text style={styles.modalTitle}>Editar Expediente</Text>

            {/* Campos para editar */}
            <ScrollView style={styles.input}>
              <TextInput
                style={styles.input}
                value={selectedExpediente?.Clave}
                placeholder="Clave"
                onChangeText={(text) => setSelectedExpediente({ ...selectedExpediente, Clave: text })}
              />
              <TextInput
                style={styles.input}
                value={selectedExpediente?.cicloEsc}
                placeholder="Ciclo Escolar"
                onChangeText={(text) => setSelectedExpediente({ ...selectedExpediente, cicloEsc: text })}
              />
              <TextInput
                style={styles.input}
                value={selectedExpediente?.Alumno}
                placeholder="Alumno"
                onChangeText={(text) => setSelectedExpediente({ ...selectedExpediente, Alumno: text })}
              />
              <TextInput
                style={styles.input}
                value={selectedExpediente?.Grado}
                placeholder="Grado"
                onChangeText={(text) => setSelectedExpediente({ ...selectedExpediente, Grado: text })}
              />
              <TextInput
                style={styles.input}
                value={selectedExpediente?.Grupo}
                placeholder="Grupo"
                onChangeText={(text) => setSelectedExpediente({ ...selectedExpediente, Grupo: text })}
              />
              <TextInput
                style={styles.input}
                value={selectedExpediente?.Resguardo}
                placeholder="Resguardo"
                onChangeText={(text) => setSelectedExpediente({ ...selectedExpediente, Resguardo: text })}
              />
              <TextInput
                style={styles.input}
                value={selectedExpediente?.Caja}
                placeholder="Caja"
                onChangeText={(text) => setSelectedExpediente({ ...selectedExpediente, Caja: text })}
              />
              <TextInput
                style={styles.input}
                value={selectedExpediente?.Expediente}
                placeholder="Expediente"
                onChangeText={(text) => setSelectedExpediente({ ...selectedExpediente, Expediente: text })}
              />
              <TextInput
                style={styles.input}
                value={selectedExpediente?.archivo}
                placeholder="Archivo"
                onChangeText={(text) => setSelectedExpediente({ ...selectedExpediente, archivo: text })}
              />
            </ScrollView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.solicitarButton}
                onPress={() => handleEditExpediente()} // Lógica para guardar los cambios
              >
                <Text style={styles.solicitarButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelarButton}
                onPress={() => setModalEdit(false)}
              >
                <Text style={styles.cancelarButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Solicitudes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSolicitud}
        onRequestClose={() => setModalSolicitud(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text onPress={() => setModalSolicitud(false)}>
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
              <TouchableOpacity style={styles.cancelarButton} onPress={() => setModalSolicitud(false)}>
                <Text style={styles.cancelarButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Agregar Expediente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAgregar}
        onRequestClose={() => setModalAgregar(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text onPress={() => setModalAgregar(false)}>
                <Image
                  source={require('../assets/icon_close.png')}
                  style={styles.modalClose}
                />
              </Text>
            </View>
            <Text style={styles.modalTitle}>Agregar Nuevo Expediente</Text>

            <ScrollView style={styles.input}>
              {/* Campos para ingresar nuevo expediente */}
              <TextInput
                style={styles.input}
                placeholder="Clave"
                value={nuevoExpediente.Clave}
                onChangeText={(text) => setNuevoExpediente({ ...nuevoExpediente, Clave: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Ciclo Escolar"
                value={nuevoExpediente.cicloEsc}
                onChangeText={(text) => setNuevoExpediente({ ...nuevoExpediente, cicloEsc: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Alumno"
                value={nuevoExpediente.Alumno}
                onChangeText={(text) => setNuevoExpediente({ ...nuevoExpediente, Alumno: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Grado"
                value={nuevoExpediente.Grado}
                onChangeText={(text) => setNuevoExpediente({ ...nuevoExpediente, Grado: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Grupo"
                value={nuevoExpediente.Grupo}
                onChangeText={(text) => setNuevoExpediente({ ...nuevoExpediente, Grupo: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Resguardo"
                value={nuevoExpediente.Resguardo}
                onChangeText={(text) => setNuevoExpediente({ ...nuevoExpediente, Resguardo: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Caja"
                value={nuevoExpediente.Caja}
                onChangeText={(text) => setNuevoExpediente({ ...nuevoExpediente, Caja: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Expediente"
                value={nuevoExpediente.Expediente}
                onChangeText={(text) => setNuevoExpediente({ ...nuevoExpediente, Expediente: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Archivo"
                value={nuevoExpediente.archivo}
                onChangeText={(text) => setNuevoExpediente({ ...nuevoExpediente, archivo: text })}
              />
            </ScrollView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.solicitarButton}
                onPress={handleAgregarExpediente}
              >
                <Text style={styles.solicitarButtonText}>Agregar Expediente</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelarButton}
                onPress={() => setModalAgregar(false)}
              >
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



  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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




  expedienteModalContent: {
    width: '80%',
    padding: 15,
    backgroundColor: '#f1e6f8',
    borderRadius: 10,
    alignItems: 'center',
  },
  expedienteDetailsContainer: {
    width: '100%',
    marginTop: 10,
  },
  expedienteField: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  expedienteFieldLabel: {
    fontWeight: 'bold',
  },
  expedienteIconContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  expedienteIcon: {
    width: 30,
    height: 30,
  },
  editarButton: {
    backgroundColor: '#f0ad4e',
    paddingVertical: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    marginRight: 10,
  },
  editarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

  // Boton de carga de registros
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  paginationButton: {
    fontSize: 16,
    color: '#0077cc',
    fontWeight: 'bold',
  },
  disabledButton: {
    color: '#ccc',
  },

});

export default ExpedientesScreen;