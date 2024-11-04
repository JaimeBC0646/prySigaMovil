import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() =>{
    fetchData()
  }, []);

  async function fetchData(){
    const response = await fetch("http://192.168.1.8:8080/users/3");
    const data = await response.json();
    console.log(data[0])
    setUsers(data[0]);
  }   

  return (
    <View style={styles.container}>
      <Text>Users: </Text>
      <Text>{JSON.stringify(users)}</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
