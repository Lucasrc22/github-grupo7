import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions, 
  ActivityIndicator,
  Alert // Adicionado para avisar se der erro de conexão
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LineChart } from "react-native-chart-kit"; 

export default function GraficoScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams();

  // Estados
  const [loading, setLoading] = useState(true);
  const [totalConsultas, setTotalConsultas] = useState(0);
  
  // Estado inicial do gráfico
  const [chartData, setChartData] = useState({
    labels: ["0"],
    datasets: [{ data: [0] }]
  });

  const handleNext = () => {
    router.push(`/doctor/${patientId}/informacoes_paciente`);
  };

  useEffect(() => {
    fetchHistorico();
  }, [patientId]);

  const fetchHistorico = async () => {
    try {
      // Configurado para localhost conforme solicitado
      const response = await fetch(`http://localhost:3000/api/ultrassons/historico/${patientId}`);
      
      if (!response.ok) {
        throw new Error(`Erro na conexão: ${response.status}`);
      }

      const dados = await response.json();

      if (dados.length > 0) {
        // 1. Ordena por data (do mais antigo para o mais novo)
        const dadosOrdenados = dados.sort((a: any, b: any) => 
          new Date(a.data_exame).getTime() - new Date(b.data_exame).getTime()
        );

        // 2. Cria o CONTADOR DE CONSULTAS (1ª, 2ª, 3ª...)
        const labels = dadosOrdenados.map((_, index) => `${index + 1}ª`);
        
        // 3. Pega os valores (Peso)
        const valores = dadosOrdenados.map((item: any) => parseFloat(item.peso_fetal) || 0);

        setTotalConsultas(dados.length);
        setChartData({
          labels: labels,
          datasets: [{ data: valores }]
        });
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      // Opcional: Alerta visual se falhar
      // Alert.alert("Erro", "Não foi possível carregar o gráfico. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.title}>Evolução do Peso Fetal</Text>

        {/* --- Card do Contador --- */}
        <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Total de Consultas</Text>
            <Text style={styles.infoValue}>{totalConsultas}</Text>
        </View>

        {/* --- Gráfico --- */}
        {loading ? (
          <ActivityIndicator size="large" color="#886aea" style={{ margin: 50 }} />
        ) : (
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={Dimensions.get("window").width - 40}
              height={250}
              yAxisLabel=""
              yAxisSuffix="g"
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(136, 106, 234, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#886aea"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
             <Text style={styles.chartAxisLabelX}>Sequência de Consultas</Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Pressão Arterial (Tela 5)</Text>
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
    alignItems: 'center', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    color: '#666',
    fontSize: 14,
  },
  infoValue: {
    color: '#886aea',
    fontSize: 32,
    fontWeight: 'bold',
  },
  chartContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  chartAxisLabelX: {
    marginTop: 10,
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic'
  },
  button: {
    backgroundColor: '#886aea', 
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%', 
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});