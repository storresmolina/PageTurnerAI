// components/PdfGrid.tsx
import React from 'react';
import { View, FlatList } from 'react-native';
import PdfCard from './PdfCard';
import AddPdfCard from './AddPdfCard';

const dummyData = [
  {
    id: '1',
    title: 'Für Elise',
    composer: 'Beethoven',
    previewImage: require('../assets/images/sample_elise.png'), // placeholder
  },
  {
    id: '2',
    title: 'Blank',
    composer: 'Composer',
    previewImage: require('../assets/images/blank_cover.png'), // placeholder
  },
];

type Props = {
  onAdd: () => void;
};

export default function PdfGrid({ onAdd }: Props) {
  return (
    <FlatList
      horizontal
      data={[...dummyData, { id: 'add', title: '', composer: '', previewImage: null }]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        item.id === 'add' ? (
          <AddPdfCard onPress={onAdd} />
        ) : (
          <PdfCard
            title={item.title}
            composer={item.composer}
            previewImage={item.previewImage}
          />
        )
      }
      contentContainerStyle={{ paddingHorizontal: 20 }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
