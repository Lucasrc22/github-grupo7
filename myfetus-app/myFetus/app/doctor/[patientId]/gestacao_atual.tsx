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


export default function GestacaoAtualScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams(); // Pega o ID do paciente

  // --- Estados do Formulário ) ---
  const [fuma, setFuma] = useState(true); // Mock para mostrar o campo
  const [quantCigarros, setQuantCigarros] = useState('5'); // Mock
  const [alcool, setAlcool] = useState(false);
  const [outrasDrogas, setOutrasDrogas] = useState(false);
  const [violenciaDomestica, setViolenciaDomestica] = useState(false);
  const [hiv, setHiv] = useState(false);
  const [sifilis, setSifilis] = useState(false);
  const [toxoplasmose, setToxoplasmose] = useState(false);
  const [infeccaoUrinaria, setInfeccaoUrinaria] = useState(false);
  const [anemia, setAnemia] = useState(false);
  const [incIstmo, setIncIstmo] = useState(false);
  const [ameacaParto, setAmeacaParto] = useState(false);
  const [isoimunizacaoRh, setIsoimunizacaoRh] = useState(false);
  const [oligoPoli, setOligoPoli] = useState(false);
  const [rutPrem, setRutPrem] = useState(false);
  const [ciur, setCiur] = useState(false);
  const [posDatismo, setPosDatismo] = useState(false);
  const [febre, setFebre] = useState(false);
  const [hipertensao, setHipertensao] = useState(false);
  const [preEclampsia, setPreEclampsia] = useState(false);
  const [cardiopatia, setCardiopatia] = useState(false);
  const [diabetesGest, setDiabetesGest] = useState(false);
  const [usoInsulina, setUsoInsulina] = useState(false);
  const [hemorragia1, setHemorragia1] = useState(false);
  const [hemorragia2, setHemorragia2] = useState(false);
  const [hemorragia3, setHemorragia3] = useState(false);
  const [exantema, setExantema] = useState(false);
  
  const handleNext = () => {
    // Navega para a Tela 10 (Vacinas)
    router.push(`/doctor/${patientId}/vacina`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <ToggleButton
          label="Fuma"
          value={fuma}
          onToggle={setFuma}
        />

        {/* Campo de texto condicional */}
        {fuma && (
          <View style={styles.textInputContainer}>
            <Text style={styles.label}>Quantos cigarros em média</Text>
            <TextInput
              style={styles.input}
              value={quantCigarros}
              onChangeText={setQuantCigarros}
              keyboardType="numeric"
            />
          </View>
        )}

        <ToggleButton label="Álcool" value={alcool} onToggle={setAlcool} />
        <ToggleButton label="Outras Drogas" value={outrasDrogas} onToggle={setOutrasDrogas} />
        <ToggleButton label="Violência Doméstica" value={violenciaDomestica} onToggle={setViolenciaDomestica} />
        <ToggleButton label="HIV/Aids" value={hiv} onToggle={setHiv} />
        <ToggleButton label="Sífilis" value={sifilis} onToggle={setSifilis} />
        <ToggleButton label="Toxoplasmose" value={toxoplasmose} onToggle={setToxoplasmose} />
        <ToggleButton label="Infecção urinária" value={infeccaoUrinaria} onToggle={setInfeccaoUrinaria} />
        <ToggleButton label="Anemia" value={anemia} onToggle={setAnemia} />
        <ToggleButton label="Inc. Istmocervical" value={incIstmo} onToggle={setIncIstmo} />
        <ToggleButton label="Ameaça de Part prem." value={ameacaParto} onToggle={setAmeacaParto} />
        <ToggleButton label="Isoimunização Rh" value={isoimunizacaoRh} onToggle={setIsoimunizacaoRh} />
        <ToggleButton label="Oligo/Polidrâmnio" value={oligoPoli} onToggle={setOligoPoli} />
        <ToggleButton label="Rut. prem. Membrana" value={rutPrem} onToggle={setRutPrem} />
        <ToggleButton label="CIUR" value={ciur} onToggle={setCiur} />
        <ToggleButton label="Pós-Datismo" value={posDatismo} onToggle={setPosDatismo} />
        <ToggleButton label="Febre" value={febre} onToggle={setFebre} />
        <ToggleButton label="Hipertensão Arterial" value={hipertensao} onToggle={setHipertensao} />
        <ToggleButton label="Pré-eclamp/Eclâmp" value={preEclampsia} onToggle={setPreEclampsia} />
        <ToggleButton label="Cardiopatia" value={cardiopatia} onToggle={setCardiopatia} />
        <ToggleButton label="Diabetes Gestacional" value={diabetesGest} onToggle={setDiabetesGest} />
        <ToggleButton label="Uso de Insulina" value={usoInsulina} onToggle={setUsoInsulina} />
        <ToggleButton label="Hemorragia 1º trim." value={hemorragia1} onToggle={setHemorragia1} />
        <ToggleButton label="Hemorragia 2º trim." value={hemorragia2} onToggle={setHemorragia2} />
        <ToggleButton label="Hemorragia 3º trim." value={hemorragia3} onToggle={setHemorragia3} />
        <ToggleButton label="Exantema/ rash cutâneo" value={exantema} onToggle={setExantema} />

        {/* Botão para a próxima tela */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Vacinas (Tela 10)</Text>
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
  // --- Estilos do ToggleButton ---
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  toggleLabel: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
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
  // --- Fim dos Estilos do Toggle ---
  
  // --- Estilos do Input de Cigarros ---
  textInputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F0EFFF',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  // --- Fim dos Estilos do Input ---
  
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