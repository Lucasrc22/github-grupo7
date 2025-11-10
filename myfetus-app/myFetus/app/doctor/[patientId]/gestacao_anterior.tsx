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

// --- COMPONENTE REUTILIZÁVEL 'ToggleButton' ---
type ToggleButtonProps = {
  label: string;
  value: boolean;
  onToggle: (newValue: boolean) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, value, onToggle }) => {
  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <View style={styles.toggleButtons}>
        <TouchableOpacity
          style={[styles.toggleBtn, value ? styles.toggleBtnActive : {}]}
          onPress={() => onToggle(true)}
        >
          <Text style={[styles.toggleText, value ? styles.toggleTextActive : {}]}>
            SIM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, !value ? styles.toggleBtnActive : {}]}
          onPress={() => onToggle(false)}
        >
          <Text style={[styles.toggleText, !value ? styles.toggleTextActive : {}]}>
            NÃO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// --- FIM DO COMPONENTE ---

// --- COMPONENTE REUTILIZÁVEL 'NumberInput' ---
type NumberInputProps = {
  label: string;
  value: string;
  onChangeText: (newValue: string) => void;
};

const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
    </View>
  );
};
// --- FIM DO COMPONENTE ---


export default function GestacaoAnteriorScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams();

  // --- Estados do Formulário ---
  // (Valores para testes/mocks)  
  const [gestacaoAnterior, setGestacaoAnterior] = useState(true);
  const [partos, setPartos] = useState('0');
  const [vaginal, setVaginal] = useState('0');
  const [cesarea, setCesarea] = useState('0');
  const [bebeMaior45, setBebeMaior45] = useState(false);
  const [bebeMenor25, setBebeMenor25] = useState(false);
  const [preEclampsia, setPreEclampsia] = useState(false);
  const [ectopica, setEctopica] = useState(false);
  const [gestas, setGestas] = useState('0');
  const [abortos, setAbortos] = useState('0');
  const [tresOuMaisAbortos, setTresOuMaisAbortos] = useState(false);
  const [nascidosVivos, setNascidosVivos] = useState('0');
  const [nascidosMortos, setNascidosMortos] = useState('0');
  const [vivem, setVivem] = useState('0');
  const [mortos1Semana, setMortos1Semana] = useState('0');
  const [finalGestacao1Ano, setFinalGestacao1Ano] = useState(false);
  const [mortosApos1Semana, setMortosApos1Semana] = useState('0');


  const handleNext = () => {
    // Navega para a Tela 8
    router.push(`/doctor/${patientId}/antecedentes_clinicos`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <ToggleButton
          label="Gestação anterior"
          value={gestacaoAnterior}
          onToggle={setGestacaoAnterior}
        />

        {/* --- Linha 1 de Inputs --- */}
        <View style={styles.inputRow}>
          <NumberInput label="Partos" value={partos} onChangeText={setPartos} />
        </View>
        <View style={styles.inputRow}>
          <NumberInput label="Vaginal" value={vaginal} onChangeText={setVaginal} />
          <NumberInput label="Cesárea" value={cesarea} onChangeText={setCesarea} />
        </View>
        
        {/* --- Linha 2 de Toggles --- */}
        <View style={styles.inputRow}>
          <ToggleButton label="Bebê > 4,5kg" value={bebeMaior45} onToggle={setBebeMaior45} />
          <ToggleButton label="Bebê > 2,5kg" value={bebeMenor25} onToggle={setBebeMenor25} />
        </View>
        <View style={styles.inputRow}>
          <ToggleButton label="Pré-eclamp." value={preEclampsia} onToggle={setPreEclampsia} />
          <ToggleButton label="Ectópica" value={ectopica} onToggle={setEctopica} />
        </View>

        {/* --- Linha 3 de Inputs --- */}
        <View style={styles.inputRow}>
          <NumberInput label="Gestas" value={gestas} onChangeText={setGestas} />
          <NumberInput label="Abortos" value={abortos} onChangeText={setAbortos} />
        </View>
        
        <ToggleButton label="3 ou + Abortos" value={tresOuMaisAbortos} onToggle={setTresOuMaisAbortos} />

        {/* --- Linha 4 de Inputs --- */}
        <View style={styles.inputRow}>
          <NumberInput label="Nascidos Vivos" value={nascidosVivos} onChangeText={setNascidosVivos} />
          <NumberInput label="Nascidos Mortos" value={nascidosMortos} onChangeText={setNascidosMortos} />
        </View>
        <View style={styles.inputRow}>
          <NumberInput label="Vivem" value={vivem} onChangeText={setVivem} />
          <NumberInput label="Mortos na 1ª sem." value={mortos1Semana} onChangeText={setMortos1Semana} />
        </View>

        {/* --- Linha 5 (Final) --- */}
        <ToggleButton label="Final da Gestação anterior há 1 ano" value={finalGestacao1Ano} onToggle={setFinalGestacao1Ano} />
        <View style={styles.inputRow}>
          <NumberInput label="Mortos depois da 1ª sem." value={mortosApos1Semana} onChangeText={setMortosApos1Semana} />
        </View>


        {/* Botão para a próxima tela */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Antecedentes Clínicos (Tela 8)</Text>
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
  // --- Estilos do ToggleButton  ---
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10, 
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    flex: 1, 
    minWidth: '48%', 
  },
  toggleLabel: {
    fontSize: 16, 
    color: '#333',
    fontWeight: '500',
    flexShrink: 1, 
  },
  toggleButtons: {
    flexDirection: 'row',
    backgroundColor: '#F0EFFF',
    borderRadius: 20,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  toggleBtnActive: {
    backgroundColor: '#886aea', 
  },
  toggleText: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: '#FFF',
  },
  // --- Fim dos Estilos do Toggle ---

  // --- Estilos do NumberInput ---
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10, 
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1, 
    minWidth: '48%', 
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  inputLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 0, 
  },
  // --- Fim dos Estilos do Input ---

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