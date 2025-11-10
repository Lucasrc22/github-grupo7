import React, { useState, useEffect } from 'react'; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator, // Para mostrar "Carregando..."
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';



// ... (os ícones e cores de status)
const statusIcons: { [key: string]: any } = {
  ok: 'happy-outline',
  pending: 'alert-circle-outline',
  danger: 'close-circle-outline',
};
const statusColors: { [key: string]: any } = {
  ok: '#2ecc71',
  pending: '#f39c12',
  danger: '#e74c3c',
};

// 2. Definindo a ESTRUTURA dos dados 
type Patient = {
  pregnant_id: string; // ID da gestante
  patient_name: string; // Nome a partir do JOIN

};


export default function DashboardScreen() {
  const router = useRouter();
  const [doctorName, setDoctorName] = useState('Dr.');
  
  // 3. NOVOS ESTADOS para carregar os pacientes
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 4. useEffect para BUSCAR OS DADOS 
  useEffect(() => {
    const loadPatients = async () => {
      try {
      
        const response = await fetch('http://localhost:3000/api/pregnants');
        if (!response.ok) {
          throw new Error('Erro ao buscar pacientes');
        }
        const data = await response.json();
        setPatients(data); // Salva os pacientes reais no estado
      } catch (e) {
        console.error('Erro de fetch:', e);
        setError(e instanceof Error ? e.message : 'Erro de rede');
      } finally {
        setLoading(false); // Para de carregar
      }
    };

    loadPatients();
    const loadDoctorName = async () => { /* ... (código do nome do Dr.) ... */ };
    loadDoctorName();

  }, []); 

  // 5. FUNÇÃO DE NAVEGAÇÃO 
  const handlePatientPress = (patientId: string) => {
    // Usamos o 'pregnant_id'  da API
    router.push(`/doctor/${patientId}/identificacao`);
  };

  // 6. RENDERIZAÇÃO DO CARD 
  const renderPatientCard = ({ item }: { item: Patient }) => (
    <TouchableOpacity
      style={styles.patientCard}
      onPress={() => handlePatientPress(item.pregnant_id)}
    >
      <View>
        {/* Usando os dados da API */}
        <Text style={styles.patientName}>{item.patient_name}</Text>
        {/* ('mock' temporario ) */}
        <Text style={styles.patientWeeks}>13 semanas de gestação</Text>
        <Text style={styles.patientNotification}>1 novo exame adicionado</Text>
      </View>
      <Ionicons
        name={statusIcons['ok']} // Mock
        size={24}
        color={statusColors['ok']} // Mock
      />
    </TouchableOpacity>
  );

  // 7. FUNÇÃO DE RENDERIZAÇÃO PRINCIPAL 
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#886aea" style={{ marginTop: 50 }} />;
    }
    if (error) {
      return <Text style={styles.errorText}>Erro ao carregar pacientes: {error}</Text>;
    }
    if (patients.length === 0) {
      return <Text style={styles.errorText}>Nenhum paciente encontrado.</Text>;
    }
    return (
      <FlatList
        data={patients} // Usando os pacientes 
        renderItem={renderPatientCard}
        keyExtractor={(item) => item.pregnant_id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* CABEÇALHO  */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Olá {doctorName}!</Text>
          <TouchableOpacity>
            <Ionicons name="filter-outline" size={28} color="#555" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subHeader}>Qual paciente você quer ver?</Text>
        {/* PESQUISA ) */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#999" style={{ marginLeft: 10 }}/>
          <TextInput
            placeholder="Pesquisar..."
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>

        {/* 8. CONTEÚDO DINÂMICO (Carregando, Erro ou Lista) */}
        {renderContent()}

      </View>
    </SafeAreaView>
  );
}

// 9. ESTILOS (
const styles = StyleSheet.create({

  
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#e74c3c',
  },

  
  safeArea: { flex: 1, backgroundColor: '#E6E0F8' },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  subHeader: { fontSize: 16, color: '#555', marginBottom: 15 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 25, height: 50, marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 } },
  searchInput: { flex: 1, height: '100%', paddingHorizontal: 10, fontSize: 16 },
  list: { flex: 1 },
  patientCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 3 } },
  patientName: { fontSize: 18, fontWeight: 'bold', color: '#b34d7a' },
  patientWeeks: { fontSize: 14, color: '#555', marginVertical: 4 },
  patientNotification: { fontSize: 12, color: '#777' },
});