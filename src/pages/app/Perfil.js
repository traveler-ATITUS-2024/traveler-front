import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const listaViagem = [
{
    id: 1,
    nome: 'Viagem Marau',
    dataIda: '2024-10-31T03:00:00.000+00:00',
    dataVolta: '2024-11-02T03:00:00.000+00:00',
    valorPrv: 870.00,
    valorReal: 560.0,
    latitude: '111111111',
    longitude: '22222222',
},
{
    id: 2,
    nome: 'Viagem PF',
    dataIda: '2024-10-31T03:00:00.000+00:00',
    dataVolta: '2024-11-02T03:00:00.000+00:00',
    valorPrv: 200.00,
    valorReal: 600.0,
    latitude: '111111111',
    longitude: '22222222',
}
]

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
      </View>

      <View>
        <Text>Minhas Viagens:</Text>
      </View>

      <View>
        <FlatList 
            data={listaViagem}
            renderItem={({item}) => (
            <View>
              <Text>{item.nome}</Text>
            </View>)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
        />
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