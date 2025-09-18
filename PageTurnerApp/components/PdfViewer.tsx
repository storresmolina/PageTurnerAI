import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Pdf from 'react-native-pdf';

type PdfViewerProps = {
  pdfSource: { uri: string };
  title: string;
  onClose: () => void;
};

export default function PdfViewer({ pdfSource, title, onClose }: PdfViewerProps) {
  const StatusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  return (
    <View style={styles.container}>
      {/* TopBar */}
      <View style={[styles.header, { paddingTop: StatusBarHeight - 15}]}>
        <TouchableOpacity onPress={onClose} style={styles.backButton} activeOpacity={0.7}>
          <AntDesign name="arrowleft" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="middle">
          {title}
        </Text>
        {/* Spacer to balance the centered title */}
        <View style={{ width: 22 }} />
      </View>

      {/* PDF Viewer */}
      <View style={styles.content}>
        <Pdf
          source={{ uri: pdfSource.uri, cache: true }}
          onLoadComplete={(pages) => console.log(`PDF loaded with ${pages} pages`)}
          onPageChanged={(page, total) => console.log(`Current page: ${page} / ${total}`)}
          onError={(error) => console.error('PDF Error:', error)}
          style={styles.pdf}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 0,
    paddingBottom: 10,
    backgroundColor: '#FAF9F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 6,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  content: { flex: 1, padding: 10 },
  pdf: { flex: 1, width: '100%', backgroundColor: 'transparent' },
});
