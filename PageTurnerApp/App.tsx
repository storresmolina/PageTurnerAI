import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Button, Alert, Text, View, Platform, StatusBar, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import * as DocumentPicker from 'expo-document-picker';
import * as SplashScreen from 'expo-splash-screen';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
// import StarOutlined from '@ant-design/icons';



// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});


export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts and other resources
        await Font.loadAsync({
          'SF-Pro': require('./assets/fonts/SF-Pro.ttf'),
          'SF-Pro-Display-Light' : require("./assets/fonts/SF-Pro-Display-Light.otf"),
          'LibreBaskerville-Regular': require('./assets/fonts/LibreBaskerville-Regular.ttf'),
          'LibreBaskerville-Bold': require('./assets/fonts/LibreBaskerville-Bold.ttf'),
          'LibreBaskerville-Italic': require('./assets/fonts/LibreBaskerville-Italic.ttf')
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  const [selectedPDF, setSelectedPDF] = useState<null | { name: String, url: String }>(null);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
      return null; // or a loading spinner
  }



  const pickPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      console.log("User cancelled upload");
      return;
    }

    const file = result.assets[0];
    console.log("Selected file:", file);

    Alert.alert("PDF Selected", file.name);
    setSelectedPDF({ name: file.name, url: file.uri});
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {selectedPDF ? (
        // 📄 PDF is selected
        <View style={styles.centerContent}>
          <Text style={{ fontFamily: 'LibreBaskerville-Bold', fontSize: 18 }}>
            Showing PDF: {selectedPDF.name}
          </Text>
          {/* Add a preview later here if needed */}
        </View>
      ) : (
        // ➕ No PDF yet
        <View style={styles.centerContent}>
          <TouchableOpacity onPress={pickPDF} style={styles.plusButton}>
            <AntDesign name="plus" size={36} color="white" />
          </TouchableOpacity>
          <Text style={styles.instructions}>
            Upload a PDF of your Sheet Music
          </Text>
        </View>
      )}
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
    backgroundColor: '#FAF9F6',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: StatusBarHeight + 20, // Add padding for status bar on Android
  },
  plusButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructions: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Light',
    textAlign: 'center',
    marginBottom: 24
  }
});
