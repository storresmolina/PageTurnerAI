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
    previewImage: require('../assets/images/sample_elise.png'),
  },
  {
    id: '2',
    title: 'Blank',
    composer: 'Composer',
    previewImage: require('../assets/images/blank_cover.png'),
  },
  {
    id: '3',
    title: 'Blank',
    composer: 'Composer',
    previewImage: require('../assets/images/blank_cover.png'),
  },
];

type Props = {
  onAdd: () => void;
  numColumns: number;
};

export default function PdfGrid({ onAdd, numColumns }: Props) {
  return (
    <FlatList
      key={numColumns}
      numColumns={numColumns}
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
      contentContainerStyle={{ padding: 20 }}
      columnWrapperStyle={{
        justifyContent: 'space-evenly',
        marginBottom: 20,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}
