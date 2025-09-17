import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Pdf from 'react-native-pdf';

type PdfViewerProps = {
  pdfSource: { uri: string };
  title: string;
  composer?: string;
  onClose: () => void;
};

export default function PdfViewer({ pdfSource, title, composer, onClose }: PdfViewerProps) {
  const StatusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: StatusBarHeight + 12 }]}>
        <TouchableOpacity onPress={onClose} style={styles.backButton} activeOpacity={0.7}>
          <AntDesign name="arrowleft" size={20} color="#333" />
          <Text style={styles.backText}>Library</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {composer && <Text style={styles.composer}>{composer}</Text>}
        </View>
        <View style={styles.spacer} />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAF9F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    marginRight: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    minHeight: 40,
  },
  backText: { fontFamily: 'SF-Pro', fontSize: 16, color: '#333', marginLeft: 6 },
  titleContainer: { flex: 1, alignItems: 'center' },
  title: {
    fontFamily: 'DMSerifDisplay-Italic',
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  composer: { fontFamily: 'SF-Pro', fontSize: 14, color: '#666', marginTop: 2 },
  spacer: { width: 50 },
  content: { flex: 1, padding: 10 },
  pdf: { flex: 1, width: '100%', backgroundColor: 'transparent' },
});
