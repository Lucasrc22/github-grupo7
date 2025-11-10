import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image, 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// -- Componente de Título de Seção  --
const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

// -- Componente de Item (para "Gestação Atual", etc) --
const InfoItem: React.FC<{ label: string; value: string; isSim: boolean }> = ({ label, value, isSim }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, isSim ? styles.valueSim : styles.valueNao]}>
      {value}
    </Text>
  </View>
);

export default function ResumoScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams(); // Pega o ID (ex: "123")

  const handleBackToStart = () => {
    
    router.push(`/doctor/dashboard`);
  };

  // --- MOCK ---
  const paciente = {
    nome: "Nome da Paciente",
    idade: 30,
    risco: "não tem gravidez de risco",
    semanas: 8,
    dum: "10/09/2025",
    dpp: "16/12/2025",
    alturaUterina: "X cm",
    classAltura: "Normal",
    bcf: "120 bpm",
    classBcf: "Normal",
    imc: 23.6,
    classImc: "Eurofia",
    ganhoPeso: 4,
    classGanho: "Normal",
    pa: "120/80",
    classPa: "Normal",
    glicemia: "Grave", // Mock
    freqCardiaca: "Grave", // Mock
    temp: "Grave", // Mock
  };
  // --- FIM MOCK---

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* --- CABEÇALHO --- */}
        <View style={styles.header}>
          <Text style={styles.headerNome}>{paciente.nome} [{paciente.idade} anos]</Text>
          <Text style={styles.headerSub}>A paciente {paciente.risco}</Text>
        </View>

        {/* --- SEÇÃO DE GESTAÇÃO --- */}
        <View style={styles.card}>
          <SectionTitle title="Gestação Atual" />
          <View style={styles.gestacaoInfo}>
            <View>
              <Text style={styles.gestacaoLabel}>Data prevista para o parto</Text>
              <Text style={styles.gestacaoDPP}>{paciente.dpp}</Text>
              <Text style={styles.gestacaoSemanas}>{paciente.semanas} semanas</Text>
            </View>
            <View style={styles.fetoPlaceholder}>
              <Ionicons name="body-outline" size={60} color="#b34d7a" />
              <Text style={{color: '#b34d7a'}}>Imagem do Feto</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Altura uterina: {paciente.alturaUterina} ({paciente.classAltura})</Text>
            <Text style={styles.infoText}>Batimentos cardíacos fetais: {paciente.bcf} ({paciente.classBcf})</Text>
          </View>
        </View>

        {/* --- SEÇÃO DE ANTECEDENTES  --- */}
        <View style={styles.card}>
          <SectionTitle title="Antecedentes Clínicos Obstétricos" />
          <InfoItem label="Diabetes" value="NÃO" isSim={false} />
          <InfoItem label="Infertilidade" value="NÃO" isSim={false} />
          <InfoItem label="Outros" value="SIM" isSim={true} />
        </View>
        
        {/* --- SEÇÃO DE DADOS ATUAIS --- */}
        <View style={styles.card}>
          <SectionTitle title="Dados da Consulta" />
          <Text style={styles.infoText}>IMC pré-gestacional: {paciente.imc.toFixed(1)} ({paciente.classImc})</Text>
          <Text style={styles.infoText}>Ganho de peso: {paciente.ganhoPeso}kg ({paciente.classGanho})</Text>
          <Text style={styles.infoText}>Pressão Arterial: {paciente.pa} ({paciente.classPa})</Text>
          
          <Text style={styles.infoText}>A glicemia em Jejum: <Text style={styles.textGrave}>{paciente.glicemia}</Text></Text>
          <Text style={styles.infoText}>Frequência cardíaca: <Text style={styles.textGrave}>{paciente.freqCardiaca}</Text></Text>
          <Text style={styles.infoText}>Temperatura materna: <Text style={styles.textGrave}>{paciente.temp}</Text></Text>
        </View>

        {/* --- SEÇÃO DE GRÁFICOS (Placeholders) --- */}
        <View style={styles.card}>
          <SectionTitle title="Gráficos" />
          <View style={styles.graficoPlaceholder}>
            <Text style={styles.graficoLabel}>Gráfico de Ganho de Peso</Text>
          </View>
          <View style={styles.graficoPlaceholder}>
            <Text style={styles.graficoLabel}>Histórico de Ultrassons</Text>
          </View>
        </View>

        {/* --- SEÇÃO DE EXAMES (Placeholders) --- */}
         <View style={styles.card}>
          <SectionTitle title="Sinais e Avaliações" />
          <Text style={styles.infoText}>Edemas: (vazio)</Text>
          <Text style={styles.infoText}>Sintomas: (vazio)</Text>
          <Text style={styles.infoText}>Avaliação Nutricional: (vazio)</Text>
        </View>


        {/* Botão para VOLTAR AO INÍCIO */}
        <TouchableOpacity style={styles.button} onPress={handleBackToStart}>
          <Text style={styles.buttonText}>Voltar ao Início</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerNome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSub: {
    fontSize: 16,
    color: '#555',
  },
  card: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b34d7a', // Rosa/Vinho
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 5,
  },
  gestacaoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  gestacaoLabel: {
    fontSize: 14,
    color: '#555',
  },
  gestacaoDPP: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  gestacaoSemanas: {
    fontSize: 18,
    color: '#555',
  },
  fetoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 15,
    backgroundColor: '#fceef5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  textGrave: {
    color: '#e74c3c', // Vermelho
    fontWeight: 'bold',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valueSim: {
    color: '#e74c3c', // Vermelho
  },
  valueNao: {
    color: '#27ae60', // Verde
  },
  graficoPlaceholder: {
    height: 150,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  graficoLabel: {
    fontSize: 16,
    color: '#aaa',
  },
  button: {
    backgroundColor: '#886aea', // Roxo
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