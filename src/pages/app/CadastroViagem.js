import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CadastroViagem({ navigation }){
    return (
        <View style={styles.container}>
            <Text>CadastroViagem</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});