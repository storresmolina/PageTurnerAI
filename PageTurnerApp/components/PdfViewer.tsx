// components/PdfViewer.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, StatusBar, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Pdf from 'react-native-pdf';

type PdfViewerProps = {
  pdfSource: string | { uri: string };
  title: string;
  composer?: string;
  onClose: () => void;
};

function isError(err: unknown): err is Error {
              return typeof err === 'object' && err !== null && 'message' in err;
            }

export default function PdfViewer({ pdfSource, title, composer, onClose }: PdfViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const pdfUrl = typeof pdfSource === 'string' ? { uri: pdfSource } : pdfSource;
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
        {loading ? (
          <View style={styles.loadingContainer}>
            <AntDesign name="loading1" size={40} color="#A47764" />
            <Text style={styles.loadingText}>
              {progress > 0 ? `Loading... ${Math.round(progress * 100)}%` : 'Loading PDF...'}
            </Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <AntDesign name="exclamationcircleo" size={40} color="#FF6B6B" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <Pdf
            source={{ ...pdfUrl, cache: true }}
            onLoadProgress={(percent) => setProgress(percent)}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`PDF loaded: ${numberOfPages} pages`);
              setLoading(false);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page} of ${numberOfPages}`);
            }}
            onError={(err) => {
              console.log('PDF Error:', err);
              if (isError(err)) {
                setError(`Failed to load PDF: ${err.message}`);
              } else {
                setError('Failed to load PDF (unknown error)');
              }
              setLoading(false);
            }}
            style={styles.pdf}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
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
  backText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 6,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  composer: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  spacer: {
    width: 50,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#A47764',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    marginTop: 10,
    textAlign: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
    backgroundColor: 'transparent',
  },
});
