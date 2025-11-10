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

// --- Funções de Cálculo/Classificação ---

// 1. Classificação da Pressão Arterial
const classificarPA = (sistole: number, diastole: number) => {
  if (!sistole || !diastole) return '';
  if (sistole < 90 || diastole < 60) return 'Hipotensão';
  if (sistole <= 120 && diastole <= 80) return 'Normal';
  if (sistole <= 139 || diastole <= 89) return 'Pré-hipertensão';
  return 'Hipertensão'; // Acima de 140/90
};

// 2. Classificação da Glicemia em Jejum
const classificarGlicemia = (glicemia: number) => {
  if (!glicemia) return '';
  if (glicemia < 70) return 'Hipoglicemia';
  if (glicemia < 100) return 'Normal';
  if (glicemia < 126) return 'Acima da Normalidade';
  return 'Diabetes';
};

// 3. Classificação da Altura Uterina (Exemplo MUITO simples)
// Na vida real, isso depende da semana de gestação.
const classificarAlturaUterina = (altura: number) => {
  if (!altura) return '';
  if (altura < 10) return 'Normal'; // Lógica de exemplo
  return 'Acima da Normalidade'; // Lógica de exemplo
};

// 4. Classificação dos Batimentos Cardíacos Fetais (BCF)
const classificarBCF = (bcf: number) => {
  if (!bcf) return '';
  if (bcf < 110) return 'Bradicardia Fetal';
  if (bcf > 160) return 'Taquicardia Fetal';
  return 'Normal';
};

// --- Fim das Funções ---

export default function InfoPacienteScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams(); // Pega o ID do paciente

  // --- Estados do Formulário ---
  const [sistole, setSistole] = useState('130'); // Dado Falso
  const [diastole, setDiastole] = useState('85'); // Dado Falso
  const [glicemia, setGlicemia] = useState('110'); // Dado Falso
  const [alturaUterina, setAlturaUterina] = useState('15'); // Dado Falso
  const [bcf, setBcf] = useState('170'); // Dado Falso

  // --- Estados das Classificações ---
  const [classPA, setClassPA] = useState('');
  const [classGlicemia, setClassGlicemia] = useState('');
  const [classAltura, setClassAltura] = useState('');
  const [classBcf, setClassBcf] = useState('');

  // --- useEffect para recalcular tudo ---
  useEffect(() => {
    const numSistole = parseInt(sistole, 10);
    const numDiastole = parseInt(diastole, 10);
    const numGlicemia = parseInt(glicemia, 10);
    const numAltura = parseInt(alturaUterina, 10);
    const numBcf = parseInt(bcf, 10);

    setClassPA(classificarPA(numSistole, numDiastole));
    setClassGlicemia(classificarGlicemia(numGlicemia));
    setClassAltura(classificarAlturaUterina(numAltura));
    setClassBcf(classificarBCF(numBcf));

  }, [sistole, diastole, glicemia, alturaUterina, bcf]);

  const handleNext = () => {
    // Navega para a Tela 6, mantendo o ID do paciente
    router.push(`/doctor/${patientId}/antecedentes_familiares`);
  };

  // Helper para cor da classificação
  const getClassStyle = (classificacao: string) => {
    if (classificacao === 'Normal') return styles.classNormal;
    if (classificacao.includes('Acima') || classificacao.includes('Pré-hipertensão')) return styles.classAmarelo;
    return styles.classVermelho; // Hipertensão, Diabetes, Taquicardia, etc.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* --- Pressão Arterial --- */}
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={styles.label}>Sístole</Text>
            <TextInput
              style={styles.input}
              value={sistole}
              onChangeText={setSistole}
              placeholder="mmHg"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.label}>Diástole</Text>
            <TextInput
              style={styles.input}
              value={diastole}
              onChangeText={setDiastole}
              placeholder="mmHg"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.calcBox}>
          <Text style={styles.calcTitle}>Classificação:</Text>
          <Text style={[styles.calcClass, getClassStyle(classPA)]}>
            {classPA}
          </Text>
        </View>

        {/* --- Glicemia --- */}
        <Text style={styles.label}>Glicemia em Jejum</Text>
        <TextInput
          style={styles.input}
          value={glicemia}
          onChangeText={setGlicemia}
          placeholder="mg/dL"
          keyboardType="numeric"
        />
        <View style={styles.calcBox}>
          <Text style={styles.calcTitle}>Classificação:</Text>
          <Text style={[styles.calcClass, getClassStyle(classGlicemia)]}>
            {classGlicemia}
          </Text>
        </View>

        {/* --- Informações do Feto --- */}
        <Text style={styles.sectionTitle}>Informações sobre o feto</Text>

        <Text style={styles.label}>Altura uterina</Text>
        <TextInput
          style={styles.input}
          value={alturaUterina}
          onChangeText={setAlturaUterina}
          placeholder="cm"
          keyboardType="numeric"
        />
        <View style={styles.calcBox}>
          <Text style={styles.calcTitle}>Classificação:</Text>
          <Text style={[styles.calcClass, getClassStyle(classAltura)]}>
            {classAltura}
          </Text>
        </View>

        <Text style={styles.label}>Batimentos cardíacos fetais</Text>
        <TextInput
          style={styles.input}
          value={bcf}
          onChangeText={setBcf}
          placeholder="bpm"
          keyboardType="numeric"
        />
        <View style={styles.calcBox}>
          <Text style={styles.calcTitle}>Classificação:</Text>
          <Text style={[styles.calcClass, getClassStyle(classBcf)]}>
            {classBcf}
          </Text>
        </View>

        {/* Botão para a próxima tela */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Antecedentes Familiares (Tela 6)</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos baseados na sua Tela 5
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E6E0F8', // Cor de fundo
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
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    width: '48%',
  },
  calcBox: {
    alignItems: 'flex-end', // Alinhado à direita
    marginVertical: 5,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  calcTitle: {
    fontSize: 16,
    color: '#555',
  },
  calcClass: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    paddingTop: 15,
  },
  classNormal: {
    color: '#27ae60', // Verde
  },
  classAmarelo: {
    color: '#f39c12', // Amarelo
  },
  classVermelho: {
    color: '#e74c3c', // Vermelho
  },
  button: {
    backgroundColor: '#886aea', // Um roxo mais forte
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