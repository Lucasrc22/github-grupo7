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

// --- Funções de Cálculo ---

// 1. Cálculo do IMC
const calcularIMC = (peso: number, altura: number) => {
  if (!peso || !altura) return 0;
  return peso / (altura * altura);
};

// 2. Classificação do IMC
const classificarIMC = (imc: number) => {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 24.9) return 'Normal';
  if (imc < 29.9) return 'Sobrepeso';
  return 'Obesidade';
};

// 3. Classificação de Ganho de Peso (Exemplo simples)
const classificarGanhoPeso = (ganho: number) => {
  if (ganho <= 0) return 'Normal'; // Lógica de exemplo
  if (ganho < 5) return 'Normal';
  return 'Acima da Normalidade'; // Lógica de exemplo
};

// 4. Classificação de Frequência Cardíaca
const classificarFC = (fc: number) => {
  if (!fc) return '';
  if (fc < 60) return 'Bradicardia';
  if (fc > 100) return 'Taquicardia';
  return 'Normal';
};

// 5. Classificação de Temperatura
const classificarTemp = (temp: number) => {
  if (!temp) return '';
  if (temp >= 37.8) return 'Febre';
  if (temp >= 37.3) return 'Febril';
  return 'Normal';
};
// --- Fim das Funções ---


export default function InfoIniciaisScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams(); // Pega o ID do paciente

  // --- Estados do Formulário ---
  const [altura, setAltura] = useState('1.65'); // Dado Falso
  const [pesoPre, setPesoPre] = useState('60'); // Dado Falso
  const [pesoAtual, setPesoAtual] = useState('64'); // Dado Falso
  const [freqCardiaca, setFreqCardiaca] = useState('105'); // Dado Falso
  const [temperatura, setTemperatura] = useState('37.9'); // Dado Falso

  // --- Estados dos Cálculos ---
  const [imc, setImc] = useState(0);
  const [classImc, setClassImc] = useState('');
  const [ganhoPeso, setGanhoPeso] = useState(0);
  const [classGanhoPeso, setClassGanhoPeso] = useState('');
  const [classFc, setClassFc] = useState('');
  const [classTemp, setClassTemp] = useState('');

  // --- useEffect para recalcular tudo ---
  // Roda sempre que um dos valores do formulário mudar
  useEffect(() => {
    const numAltura = parseFloat(altura.replace(',', '.'));
    const numPesoPre = parseFloat(pesoPre.replace(',', '.'));
    const numPesoAtual = parseFloat(pesoAtual.replace(',', '.'));
    const numFc = parseInt(freqCardiaca, 10);
    const numTemp = parseFloat(temperatura.replace(',', '.'));

    // Cálculo IMC
    const novoImc = calcularIMC(numPesoPre, numAltura);
    setImc(novoImc);
    setClassImc(classificarIMC(novoImc));

    // Cálculo Ganho de Peso
    const novoGanho = numPesoAtual - numPesoPre;
    setGanhoPeso(novoGanho);
    setClassGanhoPeso(classificarGanhoPeso(novoGanho));

    // Classificações
    setClassFc(classificarFC(numFc));
    setClassTemp(classificarTemp(numTemp));
    
  }, [altura, pesoPre, pesoAtual, freqCardiaca, temperatura]);

  const handleNext = () => {
    // Navega para a Tela 4, mantendo o ID do paciente
    router.push(`/doctor/${patientId}/grafico`);
  };

  // Helper para cor da classificação
  const getClassStyle = (classificacao: string) => {
    if (classificacao === 'Normal') return styles.classNormal;
    if (classificacao.includes('Acima') || classificacao === 'Taquicardia' || classificacao === 'Febre') return styles.classAmarelo;
    if (classificacao === 'Abaixo do peso') return styles.classAmarelo;
    if (classificacao === 'Bradicardia') return styles.classAmarelo;
    return styles.classVermelho; // Obesidade, Taquicardia, Febre
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.label}>Altura da paciente (m)</Text>
        <TextInput
          style={styles.input}
          value={altura}
          onChangeText={setAltura}
          placeholder="Ex: 1.65"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Peso pré-gestacional da paciente (kg)</Text>
        <TextInput
          style={styles.input}
          value={pesoPre}
          onChangeText={setPesoPre}
          placeholder="Ex: 60"
          keyboardType="numeric"
        />

        {/* Box do IMC */}
        <View style={styles.calcBox}>
          <Text style={styles.calcTitle}>IMC pré-gestacional</Text>
          <Text style={styles.calcValue}>{imc.toFixed(1)} kg/m²</Text>
          <Text style={[styles.calcClass, getClassStyle(classImc)]}>
            {classImc}
          </Text>
        </View>

        <Text style={styles.label}>Peso atual (kg)</Text>
        <TextInput
          style={styles.input}
          value={pesoAtual}
          onChangeText={setPesoAtual}
          placeholder="Ex: 64"
          keyboardType="numeric"
        />

        {/* Box Ganho de Peso */}
        <View style={styles.calcBox}>
          <Text style={styles.calcTitle}>O ganho de peso foi</Text>
          <Text style={styles.calcValue}>{ganhoPeso.toFixed(0)} kg</Text>
          <Text style={[styles.calcClass, getClassStyle(classGanhoPeso)]}>
            {classGanhoPeso}
          </Text>
        </View>

        <Text style={styles.label}>Frequência Cardíaca</Text>
        <TextInput
          style={styles.input}
          value={freqCardiaca}
          onChangeText={setFreqCardiaca}
          placeholder="bpm"
          keyboardType="numeric"
        />

        {/* Box Frequência Cardíaca */}
        <View style={styles.calcBox}>
          <Text style={styles.calcTitle}>Classificação:</Text>
          <Text style={[styles.calcClass, getClassStyle(classFc)]}>
            {classFc}
          </Text>
        </View>

        <Text style={styles.label}>Temperatura Materna</Text>
        <TextInput
          style={styles.input}
          value={temperatura}
          onChangeText={setTemperatura}
          placeholder="°C"
          keyboardType="numeric"
        />

        {/* Box Temperatura */}
        <View style={styles.calcBox}>
          <Text style={styles.calcTitle}>Classificação:</Text>
          <Text style={[styles.calcClass, getClassStyle(classTemp)]}>
            {classTemp}
          </Text>
        </View>

        {/* Botão para a próxima tela */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Gráfico de Acompanhamento (Tela 4)</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos baseados na sua Tela 3
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
    marginBottom: 10, // Menos espaço
  },
  calcBox: {
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 20,
  },
  calcTitle: {
    fontSize: 18,
    color: '#555',
  },
  calcValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  calcClass: {
    fontSize: 22,
    fontWeight: 'bold',
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