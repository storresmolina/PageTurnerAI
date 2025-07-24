// components/PdfCard.tsx
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

type PdfCardProps = {
  title: string;
  composer: string;
  previewImage: any; // require(...) or uri
};

export default function PdfCard({ title, composer, previewImage }: PdfCardProps) {
  return (
    <View style={styles.card}>
      <Image source={previewImage} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{composer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    marginBottom: 20,
    marginRight: 20,
  },
  image: {
    width: 120,
    height: 160,
    // borderRadius: 6,
    backgroundColor: '#FAF9F6',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontFamily: 'DMSerifDisplay-Italic',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 6,
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  
});
