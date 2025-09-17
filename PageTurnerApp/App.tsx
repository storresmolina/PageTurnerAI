import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  View,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import * as Font from 'expo-font';
import * as DocumentPicker from 'expo-document-picker';
import * as SplashScreen from 'expo-splash-screen';
import PdfGrid from './components/PdfGrid';
import PdfViewer from './components/PdfViewer';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 1000, fade: true });

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<null | { name: string; url: string }>(null);
  const { width, height } = useWindowDimensions();
  const cardWidth = 140;
  const numColumns = Math.max(1, Math.floor(width / cardWidth));

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'SF-Pro': require('./assets/fonts/SF-Pro.ttf'),
          'SF-Pro-Display-Light': require('./assets/fonts/SF-Pro-Display-Light.otf'),
          'LibreBaskerville-Regular': require('./assets/fonts/LibreBaskerville-Regular.ttf'),
          'LibreBaskerville-Bold': require('./assets/fonts/LibreBaskerville-Bold.ttf'),
          'LibreBaskerville-Italic': require('./assets/fonts/LibreBaskerville-Italic.ttf'),
          'DMSerifDisplay-Italic': require('./assets/fonts/DMSerifDisplay-Italic.ttf'),
          'DMSerifDisplay-Regular': require('./assets/fonts/DMSerifDisplay-Italic.ttf'),
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
    if (appIsReady) SplashScreen.hideAsync();
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
    setSelectedPDF({ name: file.name, url: file.uri });
  };

  if (!appIsReady) return null;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>
          <Text style={styles.TopBarText1}> pageturner </Text>
          <Text style={styles.TopBarText2}>AI</Text>
        </Text>
        <Text style={styles.menuTitle}>LIBRARY</Text>
      </View>
      <View style={styles.mainContent}>
        {selectedPDF ? (
          <PdfViewer
            pdfSource={{ uri: selectedPDF.url }}
            title={selectedPDF.name}
            onClose={() => setSelectedPDF(null)}
          />
        ) : (
          <PdfGrid onAdd={pickPDF} numColumns={numColumns} />
        )}
      </View>
    </View>
  );
}

const StatusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  topBar: {
    backgroundColor: '#FAF9F6',
    paddingTop: StatusBarHeight,
    height: 50 + StatusBarHeight,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  topBarText: {
    fontSize: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  TopBarText1: {
    fontFamily: 'DMSerifDisplay-Italic',
    fontSize: 23,
    color: '#333',
    textShadowColor: '#333',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 0.2,
  },
  TopBarText2: {
    fontFamily: 'SF-Pro',
    color: '#333',
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 1.2,
  },
  menuTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: StatusBarHeight + 13,
    textAlign: 'center',
    fontFamily: 'SF-Pro-Display-Light',
    fontSize: 15,
    color: '#A47764',
  },
  mainContent: { flex: 1, justifyContent: 'center', paddingTop: 20 },
});
