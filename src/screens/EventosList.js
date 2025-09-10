import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { getEventos } from "./../axios/api";

export default function EventosList() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await getEventos();
        // Acessando a propriedade correta da API
        setEventos(response.data.eventos);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        Alert.alert("Erro", "Não foi possível carregar a lista de eventos.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text>{item.local}</Text>
      <Text>{new Date(item.data_hora).toLocaleString()}</Text>

      {/* URL corrigida com o IP da sua máquina */}
      <Image
        source={{
          uri: `http://10.89.240.72:5000/api/v1/evento/imagem/${item.id_evento}`,
        }}
        style={styles.imagem}
        resizeMode="cover"
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={eventos}
      keyExtractor={(item) => item.id_evento.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  imagem: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
});