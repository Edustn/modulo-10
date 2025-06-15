import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import TelaLogin from './components/TelaLogin';
import AppNavigator from './routes/AppNavigator';
// import TelaCadastro from './components/TelaCadastro';


export default function App() {
  return (

    // <TelaCadastro></TelaCadastro>
    <AppNavigator />

  );
}
