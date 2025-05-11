import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import "./global.css"
import TelaLogin from './components/TelaLogin';
import { SafeAreaView } from 'react-native-safe-area-context';
import TelaCadastro from './components/TelaCadastro';


export default function App() {
  return (

    <TelaCadastro></TelaCadastro>
    // <TelaLogin></TelaLogin>

  );
}
