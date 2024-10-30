import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

export default function Perfil() {
  const nomeUsuario = 'Bernardo';
  const email = 'bernardo@gmail.com';

  return (
    <View style={styles.container}>
      <View>
        <Image src='../../assets/logo.png'/>
      </View>

      <View>
        <Text>Olá, {nomeUsuario}</Text>
        <Text>{email}</Text>

        <View>
            <TouchableOpacity>
                <Text>Editar Email</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>Alterar Senha</Text>
            </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity>
            <Image src='../../assets/excluir.png'/>
            <Text>Excluir Conta</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
      <TouchableOpacity>
            <Image src='../../assets/sair.png'/>
            <Text>Sair</Text>
          </TouchableOpacity>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});