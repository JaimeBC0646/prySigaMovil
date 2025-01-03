import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


const HeaderLogos = () => {
    return (
        <View style={styles.header}>
            <Image source={require('../assets/images/ESGHAR.png')} style={styles.esghardLogo} />
            <Image source={require('../assets/images/SIGA.png')} style={styles.logo} />
            <Image source={require('../assets/images/SigaLogo.png')} style={styles.SigaLogo} />
        </View>

    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around'
      },
    esghardLogo: {
        width: 70,
        height: 70,
    },
    logo: {
        width: 120,
        height: 50,
    },
    SigaLogo: {
        width: 70,
        height: 70,
    },
});

export default HeaderLogos;
