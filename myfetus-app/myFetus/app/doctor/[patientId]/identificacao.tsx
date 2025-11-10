import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Esta função calcula a idade
const calcularIdade = (dataNasc: string) => {
  if (!dataNasc || dataNasc.length !== 10) return 0; // Formato DD/MM/AAAA
  const [dia, mes, ano] = dataNasc.split('/').map(Number);
  const hoje = new Date();
  const nasc = new Date(ano, mes - 1, dia);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  return idade;
};

export default function IdentificacaoScreen() {
  const router = useRouter();
  
  // 1. Lendo o ID do paciente da URL (ex: "123")
  const { patientId } = useLocalSearchParams();

  // 2. Estados para os campos do formulário
  const [nome, setNome] = useState('Paciente 1'); 
  const [dataNascimento, setDataNascimento] = useState('01/01/1995'); 
  const [idade, setIdade] = useState(0);

  // 3. Efeito para calcular a idade
  useEffect(() => {
    const novaIdade = calcularIdade(dataNascimento);
    setIdade(novaIdade);
  }, [dataNascimento]);

  // 4. Navegação
  const handleNext = () => {
    // Navega para a Tela 3, mantendo o ID do paciente
    router.push(`/doctor/${patientId}/informacoes_iniciais`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nome da paciente</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome completo"
        />

        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          value={dataNascimento}
          onChangeText={setDataNascimento}
          placeholder="DD/MM/AAAA"
          keyboardType="numeric"
          maxLength={10}
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>A idade da Paciente é</Text>
          <Text style={styles.infoValue}>{idade} anos</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={[
              styles.infoValue, 
              idade >= 35 ? styles.riscoAlto : styles.riscoNormal
            ]}>
            {idade >= 35 ? 'Considerado Gravidez de Risco' : 'Não é considerado gravidez de Risco'}
          </Text>
        </View>

        {/* Botão para a próxima tela */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Informações da Paciente (Tela 3)</Text>
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
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  infoBox: {
    alignItems: 'center',
    marginVertical: 15,
  },
  infoTitle: {
    fontSize: 20,
    color: '#555',
  },
  infoValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  riscoAlto: {
    color: '#e74c3c', 
  },
  riscoNormal: {
    color: '#27ae60', 
  },
  button: {
    backgroundColor: '#886aea', 
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});