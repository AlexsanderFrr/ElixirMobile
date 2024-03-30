import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { ImageBackground } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Elixir Natural</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4DEAA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30, // Tamanho da fonte
    fontFamily: 'Lora', // Substituindo fonte
    color: '#BB5104', // Cor do texto (exemplo: preto)
    fontWeight: 'bold', // texto em negrito
  },
});
