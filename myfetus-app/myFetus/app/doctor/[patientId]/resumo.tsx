import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator, 
  Alert, 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// ---  Funções de Cálculo e Formatação ---
const calcularIdade = (dataNasc: Date) => {
  const hoje = new Date();
  let idade = hoje.getFullYear() - dataNasc.getFullYear();
  const m = hoje.getMonth() - dataNasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
    idade--;
  }
  return idade;
};
const formatarData = (dataISO: string) => {
  if (!dataISO) return "N/A";
  const dataObj = new Date(dataISO);
  const dia = String(dataObj.getUTCDate()).padStart(2, '0');
  const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0');
  const ano = dataObj.getUTCFullYear();
  return `${dia}/${mes}/${ano}`;
};
const calcularIMC = (peso: number, altura: number) => {
  if (!peso || !altura) return 0;
  return peso / (altura * altura);
};
const classificarIMC = (imc: number) => {
  if (imc === 0) return '';
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 24.9) return 'Normal';
  if (imc < 29.9) return 'Sobrepeso';
  return 'Obesidade';
};
const classificarPA = (sistole: number, diastole: number) => {
  if (!sistole || !diastole) return 'N/A';
  if (sistole < 90 || diastole < 60) return 'Hipotensão';
  if (sistole <= 120 && diastole <= 80) return 'Normal';
  if (sistole <= 139 || diastole <= 89) return 'Pré-hipertensão';
  return 'Hipertensão';
};
// --- Fim das Funções ---

// -- Componente de Título de Seção  --
const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

// -- Componente de Item  --
const InfoItem: React.FC<{ label: string; value: string; isSim: boolean }> = ({ label, value, isSim }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, isSim ? styles.valueSim : styles.valueNao]}>
      {value}
    </Text>
  </View>
);
// --- Fim dos Componentes ---

//  Interface para os dados
interface PacienteCompleto {
  patient_name: string;
  birthdate: string;
  altura: number;
  peso_pregestacional: number;
  peso_atual: number;
  temperatura_materna: number;
  pressao_sistole: number;
  pressao_diastole: number;
  latest_pregnancy: {
    id: string;
    weeks: number;
    dum: string;
    dpp: string;
    glicemia: number;
    frequencia_cardiaca: number; // BCF
    altura_uterina: number;
  };
  // Antecedentes (Telas 6, 7, 8, 9, 10, 13)
  antecedentes_diabetes: boolean;
  antecedentes_hipertensao: boolean;
  antecedentes_gemelar: boolean;
  antecedentes_outros: boolean;
  antecedentes_texto: string;
  

  info_gerais_edemas: string;
  info_gerais_sintomas: string;
  info_gerais_estado_geral_1: string;
  info_gerais_estado_geral_2: string;
  info_gerais_nutricional: string;
  info_gerais_psicossocial: string;
}


export default function ResumoScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams(); 

  // --- Estados de Dados ---
  const [paciente, setPaciente] = useState<PacienteCompleto | null>(null);
  const [loading, setLoading] = useState(true);

  // ---  useEffect para LER TUDO ---
  useEffect(() => {
    if (!patientId) return;
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/pregnants/${patientId}`);
        if (!response.ok) {
          throw new Error('Não foi possível buscar os dados da paciente');
        }
        const data = await response.json();
        setPaciente(data);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', error instanceof Error ? error.message : 'Erro de rede');
      } finally {
        setLoading(false);
      }
    };
    fetchPatientData();
  }, [patientId]);


  const handleBackToStart = () => {
    router.push(`/doctor/dashboard`);
  };

  // ---  Cálculos derivados ---
  const idade = paciente ? calcularIdade(new Date(paciente.birthdate)) : 0;
  const risco = idade >= 35 ? "é considerada gravidez de Risco" : "não é considerada gravidez de Risco";
  const imc = paciente ? calcularIMC(paciente.peso_pregestacional, paciente.altura) : 0;
  const classImc = classificarIMC(imc);
  const ganhoPeso = paciente ? paciente.peso_atual - paciente.peso_pregestacional : 0;
  const pa = paciente ? `${paciente.pressao_sistole}/${paciente.pressao_diastole} mmHg` : 'N/A';
  const classPa = paciente ? classificarPA(paciente.pressao_sistole, paciente.pressao_diastole) : '';

  // ---  Telas de Loading / Erro ---
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#886aea" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }
  if (!paciente) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.textGrave}>Não foi possível carregar os dados da paciente.</Text>
      </SafeAreaView>
    );
  }

  // --- JSX ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* --- CABEÇALHO --- */}
        <View style={styles.header}>
          <Text style={styles.headerNome}>{paciente.patient_name} [{idade} anos]</Text>
          <Text style={styles.headerSub}>A paciente {risco}</Text>
        </View>

        {/* --- SEÇÃO DE GESTAÇÃO --- */}
        <View style={styles.card}>
          <SectionTitle title="Gestação Atual" />
          {paciente.latest_pregnancy ? (
            <View style={styles.gestacaoInfo}>
              <View>
                <Text style={styles.gestacaoLabel}>Data prevista para o parto</Text>
                <Text style={styles.gestacaoDPP}>{formatarData(paciente.latest_pregnancy.dpp)}</Text>
                <Text style={styles.gestacaoSemanas}>{paciente.latest_pregnancy.weeks} semanas</Text>
              </View>
              <View style={styles.fetoPlaceholder}>
                <Ionicons name="body-outline" size={60} color="#b34d7a" />
                <Text style={{color: '#b34d7a'}}>Imagem do Feto</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.infoText}>Nenhuma gestação registrada.</Text>
          )}
          
          {paciente.latest_pregnancy && (
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Altura uterina: {paciente.latest_pregnancy.altura_uterina} cm</Text>
              <Text style={styles.infoText}>Batimentos cardíacos fetais: {paciente.latest_pregnancy.frequencia_cardiaca} bpm</Text>
            </View>
          )}
        </View>

        {/* --- SEÇÃO DE ANTECEDENTES (Tela 6) --- */}
        <View style={styles.card}>
          <SectionTitle title="Antecedentes Familiares" />
          <InfoItem label="Diabetes" value={paciente.antecedentes_diabetes ? "SIM" : "NÃO"} isSim={paciente.antecedentes_diabetes} />
          <InfoItem label="Hipertensão" value={paciente.antecedentes_hipertensao ? "SIM" : "NÃO"} isSim={paciente.antecedentes_hipertensao} />
          <InfoItem label="Gemelar" value={paciente.antecedentes_gemelar ? "SIM" : "NÃO"} isSim={paciente.antecedentes_gemelar} />
          <InfoItem label="Outros" value={paciente.antecedentes_outros ? "SIM" : "NÃO"} isSim={paciente.antecedentes_outros} />
          {paciente.antecedentes_outros && <Text style={styles.infoText}>Descrição: {paciente.antecedentes_texto}</Text>}
        </View>
        
        {/* --- SEÇÃO DE DADOS ATUAIS (Tela 3 e 5) --- */}
        <View style={styles.card}>
          <SectionTitle title="Dados da Consulta" />
          <Text style={styles.infoText}>IMC pré-gestacional: {imc.toFixed(1)} kg/m² ({classImc})</Text>
          <Text style={styles.infoText}>Ganho de peso: {ganhoPeso.toFixed(0)} kg</Text>
          <Text style={styles.infoText}>Pressão Arterial: {pa} ({classPa})</Text>
          
          <Text style={styles.infoText}>Glicemia em Jejum: {paciente.latest_pregnancy?.glicemia} mg/dL</Text>
          <Text style={styles.infoText}>Temperatura materna: {paciente.temperatura_materna} °C</Text>
        </View>

        {/* --- SEÇÃO DE GRÁFICOS (Placeholders) --- */}
        <View style={styles.card}>
          <SectionTitle title="Gráficos" />
          <View style={styles.graficoPlaceholder}>
            <Text style={styles.graficoLabel}>Gráfico de Ganho de Peso (Tela 4)</Text>
          </View>
          <View style={styles.graficoPlaceholder}>
            <Text style={styles.graficoLabel}>Histórico de Ultrassons (Tela 11)</Text>
          </View>
        </View>

        {/* --- SEÇÃO DE INFORMAÇÕES GERAIS (Tela 13) --- */}
         <View style={styles.card}>
          <SectionTitle title="Informações Gerais" />
          <Text style={styles.infoLabel}>Edemas em membros inferiores:</Text>
          <Text style={styles.infoText}>{paciente.info_gerais_edemas || "(Vazio)"}</Text>
          
          <Text style={styles.infoLabel}>Sintomas/ Sinais de complicações:</Text>
          <Text style={styles.infoText}>{paciente.info_gerais_sintomas || "(Vazio)"}</Text>
          
          <Text style={styles.infoLabel}>Avaliação Nutricional:</Text>
          <Text style={styles.infoText}>{paciente.info_gerais_nutricional || "(Vazio)"}</Text>
        </View>

        {/* Botão para VOLTAR AO INÍCIO */}
        <TouchableOpacity style={styles.button} onPress={handleBackToStart}>
          <Text style={styles.buttonText}>Voltar ao Início</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos 
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
    color: '#b34d7a',
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
    color: '#444',
    marginBottom: 5,
  },
  textGrave: {
    color: '#e74c3c',
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
    fontWeight: '500', 
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valueSim: {
    color: '#e74c3c',
  },
  valueNao: {
    color: '#27ae60',
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