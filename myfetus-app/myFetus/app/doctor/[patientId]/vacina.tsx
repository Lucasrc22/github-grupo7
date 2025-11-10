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
import { Ionicons } from '@expo/vector-icons'; 

// --- COMPONENTE REUTILIZÁVEL 'DateInput' ---
type DateInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const DateInput: React.FC<DateInputProps> = ({ label, value, onChangeText, placeholder = "DD/MM/AAAA" }) => (
  <View style={styles.dateInputContainer}>
    <Text style={styles.dateLabel}>{label}</Text>
    <TextInput
      style={styles.dateInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType="numeric"
      maxLength={10}
    />
  </View>
);

// --- COMPONENTE REUTILIZÁVEL 'RadioGroup' ---
type RadioOption = { label: string; value: string };
type RadioGroupProps = {
  options: RadioOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ options, selectedValue, onSelect }) => (
  <View>
    {options.map((option) => (
      <TouchableOpacity
        key={option.value}
        style={styles.radioOption}
        onPress={() => onSelect(option.value)}
      >
        <Ionicons
          name={selectedValue === option.value ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color={selectedValue === option.value ? '#886aea' : '#aaa'}
        />
        <Text style={styles.radioLabel}>{option.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

// --- COMPONENTE REUTILIZÁVEL 'ToggleSwitch' (O SIM/NÃO) ---
type ToggleSwitchProps = {
  label: string;
  value: boolean;
  onToggle: (newValue: boolean) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, value, onToggle }) => (
  <View style={styles.toggleContainer}>
    <Text style={styles.toggleLabel}>{label}</Text>
    <View style={styles.toggleButtons}>
      <TouchableOpacity
        style={[styles.toggleBtn, value ? styles.toggleBtnActive : {}]}
        onPress={() => onToggle(true)}
      >
        <Text style={[styles.toggleText, value ? styles.toggleTextActive : {}]}>SIM</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleBtn, !value ? styles.toggleBtnActive : {}]}
        onPress={() => onToggle(false)}
      >
        <Text style={[styles.toggleText, !value ? styles.toggleTextActive : {}]}>NÃO</Text>
      </TouchableOpacity>
    </View>
  </View>
);


export default function VacinasScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams();

  // --- Estados do Formulário ---
  const [antitetanica, setAntitetanica] = useState('mais_5_anos'); // Mock
  const [antiDose1, setAntiDose1] = useState('');
  const [antiDose2, setAntiDose2] = useState('');
  const [antiDTpa, setAntiDTpa] = useState('');

  const [hepatiteB, setHepatiteB] = useState(true); // Mock
  const [hepDose1, setHepDose1] = useState('');
  const [hepDose2, setHepDose2] = useState('');
  const [hepDose3, setHepDose3] = useState('');

  const [influenza, setInfluenza] = useState(true); // Mock
  const [fluData, setFluData] = useState('');

  const [covid, setCovid] = useState(true); // Mock
  const [covidDose1, setCovidDose1] = useState('');
  const [covidDose2, setCovidDose2] = useState('');

  const antitetanicaOptions = [
    { label: 'Sem informações de Imunização', value: 'sem_info' },
    { label: 'Imunizada há menos de 5 anos', value: 'menos_5_anos' },
    { label: 'Imunizada há mais de 5 anos', value: 'mais_5_anos' },
  ];
  
  const handleNext = () => {
    router.push(`/doctor/${patientId}/historico_ultrassons`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* --- Antitetânica --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Antitetânica</Text>
          <RadioGroup
            options={antitetanicaOptions}
            selectedValue={antitetanica}
            onSelect={setAntitetanica}
          />
          {/* Mostra as datas se a opção 'mais_5_anos' estiver selecionada */}
          {antitetanica === 'mais_5_anos' && (
            <View style={styles.dateRow}>
              <DateInput label="1ª dose" value={antiDose1} onChangeText={setAntiDose1} />
              <DateInput label="2ª dose" value={antiDose2} onChangeText={setAntiDose2} />
              <DateInput label="Vacinas dTpa" value={antiDTpa} onChangeText={setAntiDTpa} />
            </View>
          )}
        </View>

        {/* --- Hepatite B --- */}
        <View style={styles.card}>
          <ToggleSwitch label="Hepatite B" value={hepatiteB} onToggle={setHepatiteB} />
          {hepatiteB && (
            <View style={styles.dateColumn}>
              <DateInput label="1ª dose" value={hepDose1} onChangeText={setHepDose1} />
              <DateInput label="2ª dose (1mês)" value={hepDose2} onChangeText={setHepDose2} />
              <DateInput label="3ª dose (6meses)" value={hepDose3} onChangeText={setHepDose3} />
            </View>
          )}
        </View>

        {/* --- Influenza --- */}
        <View style={styles.card}>
          <ToggleSwitch label="Influenza" value={influenza} onToggle={setInfluenza} />
          {influenza && (
            <DateInput label="Data" value={fluData} onChangeText={setFluData} />
          )}
        </View>

        {/* --- Covid-19 --- */}
        <View style={styles.card}>
          <ToggleSwitch label="Covid-19" value={covid} onToggle={setCovid} />
          {covid && (
            <View style={styles.dateRow}>
              <DateInput label="1ª dose" value={covidDose1} onChangeText={setCovidDose1} />
              <DateInput label="2ª dose" value={covidDose2} onChangeText={setCovidDose2} />
            </View>
          )}
        </View>

        {/* Botão para a próxima tela */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Histórico de Ultrassons (Tela 11)</Text>
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
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  // --- Estilos do Radio Button ---
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioLabel: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  // --- Estilos do Toggle (SIM/NÃO) ---
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
    marginRight: 10,
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
  // --- Estilos dos Inputs de Data ---
  dateRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite quebra de linha se não couber
    justifyContent: 'space-between',
    marginTop: 15,
  },
  dateColumn: {
    marginTop: 15,
  },
  dateInputContainer: {
    width: '48%', 
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  dateInput: {
    backgroundColor: '#F0EFFF',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  // --- Botão de Navegação ---
  button: {
    backgroundColor: '#886aea',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});