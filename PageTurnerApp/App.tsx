import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Alert, Text, View, Platform, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import * as DocumentPicker from 'expo-document-picker';
import * as SplashScreen from 'expo-splash-screen';
import PdfGrid from './components/PdfGrid';
import { ItalicOutlined } from '@ant-design/icons';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 1000, fade: true });

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<null | { name: string; url: string }>(null);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'SF-Pro': require('./assets/fonts/SF-Pro.ttf'),
          'SF-Pro-Display-Light': require('./assets/fonts/SF-Pro-Display-Light.otf'),
          'LibreBaskerville-Regular': require('./assets/fonts/LibreBaskerville-Regular.ttf'),
          'LibreBaskerville-Bold': require('./assets/fonts/LibreBaskerville-Bold.ttf'),
          'LibreBaskerville-Italic': require('./assets/fonts/LibreBaskerville-Italic.ttf'),
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

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const pickPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      console.log('User cancelled upload');
      return;
    }

    const file = result.assets[0];
    console.log('Selected file:', file);
    Alert.alert('PDF Selected', file.name);
    setSelectedPDF({ name: file.name, url: file.uri });
  };

  if (!appIsReady) return null;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>PageTurner AI</Text>
      </View>

      <View style={styles.mainContent}>
        {selectedPDF ? (
          <View style={styles.centerContent}>
            <Text style={styles.pdfTitle}>Showing PDF: {selectedPDF.name}</Text>
            {/* TODO: PDF Preview Component */}
          </View>
        ) : (
          <PdfGrid onAdd={pickPDF} />
        )}
      </View>
    </View>
  );
}

const StatusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  topBar: {
    backgroundColor: '#A47764',
    paddingTop: StatusBarHeight,
    height: 50 + StatusBarHeight,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  topBarText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'LibreBaskerville-Italic',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfTitle: {
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 18,
    color: '#333',
  },
});
