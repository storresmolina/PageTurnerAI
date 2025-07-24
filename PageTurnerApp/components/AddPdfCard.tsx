// components/AddPdfCard.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
};

export default function AddPdfCard({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.plusContainer}>
        <AntDesign name="plus" size={40} color="#FAF9F6" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
  width: 120,
  marginBottom: 20,
  marginRight: 20,
  },
  plusContainer: {
    width: 120,
    height: 160,
    // borderRadius: 6,
    backgroundColor: '#EBE9E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
    marginTop: 6,
  },
});
