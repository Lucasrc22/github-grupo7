import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// --- DADOS FALSOS (MOCK) para a lista de exames ---
const mockExames = [
  {
    id: '1',
    data: '25/10/2025',
    titulo: 'Exame Complementar 1',
    descricao: 'text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text',
  },
  {
    id: '2',
    data: '18/10/2025',
    titulo: 'Exame Complementar 2',
    descricao: 'Descrição curta do exame.',
  },
];
// --- MOCK ---

export default function ExamesScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams(); // Pega o ID do paciente

  const handleNext = () => {
    router.push(`/doctor/${patientId}/informacoes_gerais`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Lista de Exames */}
        {mockExames.map((exame) => (
          <View key={exame.id} style={styles.card}>
            <Text style={styles.cardData}>{exame.data}</Text>
            <Text style={styles.cardTitle}>{exame.titulo}</Text>
            
            {/* Caixa de descrição  */}
            <View style={styles.descricaoBox}>
              <Text style={styles.descricaoText}>{exame.descricao}</Text>
            </View>
          </View>
        ))}

        {/* Botão para a próxima tela */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Informações Gerais (Tela 13)</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E6E0F8', 
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#F0EFFF', 
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  cardData: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  descricaoBox: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 15,
    padding: 15,
  },
  descricaoText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22, 
  },
  button: {
    backgroundColor: '#886aea', 
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%', 
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});