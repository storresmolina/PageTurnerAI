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
];

interface CardItem {
  id: string;
  title: string;
  composer: string;
  previewImage: any;
  placeholder?: boolean;
}

type Props = {
  onAdd: () => void;
  numColumns: number;
};

export default function PdfGrid({ onAdd, numColumns }: Props) {
  // 1. Place loaded sheet music first, then AddPdfCard
  const cards: CardItem[] = [
    ...dummyData,
    { id: 'add', title: '', composer: '', previewImage: null, placeholder: false },
  ];

  // 2. Pad with placeholders for perfect grid
  const remainder = cards.length % numColumns;
  const placeholders =
    remainder === 0
      ? []
      : Array(numColumns - remainder)
          .fill(null)
          .map((_, idx) => ({
            id: `placeholder-${idx}`,
            title: '',
            composer: '',
            previewImage: null,
            placeholder: true,
          }));

  const data = [...cards, ...placeholders];

  return (
    <FlatList
      key={numColumns}
      numColumns={numColumns}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        item.id === 'add' ? (
          <AddPdfCard onPress={onAdd} />
        ) : item.placeholder ? (
          <View style={{ flex: 1, margin: 10 }} />
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
