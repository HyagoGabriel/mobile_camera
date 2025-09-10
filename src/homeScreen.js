import React from "react";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import api from "./axios/axios";

const HomeScreen = () => {
  const [stateLED, setStateLED] = useState({value: true})
  const navigation = useNavigation();

    const handleCam = () => {
        navigation.navigate("Cam");
    }

    async function ledToggle(){
      try{
      // Faz a requisição da API da Adafruit
        const response = await api.toggleLED({value:`${!stateLED.value}` });
        setStateLED({value: !stateLED.value})
        console.log("Resposta: ", response.data)
 
    } catch(error){
      console.log("Erro", error.response.data);

    } 
    
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{marginBottom: 20}}>

      <Button title="Abrir Câmera" onPress={handleCam} color="blue" />
      </View>
      <View>
      <Button title={stateLED.value ? "Desligar Led" : "Ligar Led"} onPress={ledToggle} color={stateLED.value ? "red" : "green"} />
      </View>
      <View>
      <Button title="Listar Eventos" onPress={() => navigation.navigate("Eventos")} />
      </View>
    </View>
  );
};
export default HomeScreen;