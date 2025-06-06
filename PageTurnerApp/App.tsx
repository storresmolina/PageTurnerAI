import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';

export default function App() {  
  return (
     <View style={styles.container}>
       <StatusBar hidden={true} />

       <View style={styles.topBar}>
         <Text style={styles.topBarText}>PageTurner AI</Text>
       </View>

       <View style={styles.mainContent}>
           <Text style={{textDecorationLine: 'line-through'}}>Welcome to PageTurner AI!</Text>
           <Text style={[styles.ColoredBox]}> Does this work? </Text>
           <Text> Bro is trying to make an App 💀</Text>


       </View>  
    </View>
  );
}

const StatusBarHeight = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0;
const styles = StyleSheet.create({
  // AndroidSafeArea: {
  //   flex: 1,
  //   backgroundColor: 'skyblue',
  //   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  // },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    backgroundColor: 'skyblue',
    // alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: StatusBarHeight,
    height: 50 + StatusBarHeight,
    // position: 'absolute',
  },
  topBarText: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ColoredBox: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'skyblue',
  },
  Example1: {
    color: 'blue',  
    fontSize: 20,
    // fontWeight: 'bold',
    fontStyle: 'italic',
  }
});
