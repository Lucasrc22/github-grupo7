import React, { useState } from 'react';
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

// --- COMPONENTE REUTILIZÁVEL 'TextAreaInput' ---
type TextAreaInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.textInputArea}
      value={value}
      onChangeText={onChangeText}
      placeholder="Descreva aqui..."
      multiline
    />
  </View>
);
// --- FIM DO COMPONENTE ---


export default function InformacoesGeraisScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams(); // Pega o ID do paciente

  // --- Estados do Formulário ---
  const [edemas, setEdemas] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [estadoGeral1, setEstadoGeral1] = useState(''); 
  const [estadoGeral2, setEstadoGeral2] = useState(''); 
  const [nutricional, setNutricional] = useState('');
  const [psicossocial, setPsicossocial] = useState('');

  const handleNext = () => {
    // FIM! Voltamos para o Dashboard principal do Doutor
        router.push(`/doctor/${patientId}/resumo`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <TextAreaInput
          label="Edemas em membros inferiores"
          value={edemas}
          onChangeText={setEdemas}
        />
        
        <TextAreaInput
          label="Sintomas/ Sinais de complicações"
          value={sintomas}
          onChangeText={setSintomas}
        />

        <TextAreaInput
          label="Estado Geral da Gestante"
          value={estadoGeral1}
          onChangeText={setEstadoGeral1}
        />

        <TextAreaInput
          label="Estado Geral da Gestante"
          value={estadoGeral2}
          onChangeText={setEstadoGeral2}
        />

        <TextAreaInput
          label="Avaliação nutricional"
          value={nutricional}
          onChangeText={setNutricional}
        />
        
        <TextAreaInput
          label="Avaliação Psicossocial e emocional"
          value={psicossocial}
          onChangeText={setPsicossocial}
        />

        {/* Botão para a próxima tela */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Dashboard da Paciente</Text>
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: '500',
  },
  textInputArea: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    fontSize: 16,
    minHeight: 100, 
    textAlignVertical: 'top',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
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