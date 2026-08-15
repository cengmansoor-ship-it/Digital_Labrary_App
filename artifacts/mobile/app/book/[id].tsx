import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { books } from '@/data/library';
import { useLibrary } from '@/contexts/LibraryContext';
import { BookCover, ScreenShell } from '@/components/LibraryUi';

export default function BookDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { favorites, toggleFavorite } = useLibrary();
  const book = books.find((item) => item.id === id);
  const saved = book ? favorites.includes(book.id) : false;

  if (!book) {
    return (
      <ScreenShell>
        <View style={styles.notFound}><Feather name="book-open" size={28} color={colors.primary} /><Text style={[styles.notFoundTitle, { color: colors.foreground }]}>This book is not on the shelf</Text><Text style={[styles.notFoundDetail, { color: colors.mutedForeground }]}>The title may have moved or is not yet available.</Text></View>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <View style={styles.topline}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>{book.category}</Text>
        <Pressable onPress={() => toggleFavorite(book.id)} hitSlop={10} accessibilityLabel={saved ? 'Remove from saved' : 'Save book'}>
          <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={23} color={saved ? colors.primary : colors.mutedForeground} />
        </Pressable>
      </View>
      <View style={styles.coverWrap}><BookCover book={book} large /></View>
      <Text style={[styles.title, { color: colors.foreground }]}>{book.title}</Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{book.subtitle}</Text>
      <View style={styles.metaRow}>
        <Meta label="Language" value={book.language} />
        <Meta label="Edition" value={book.year} />
        <Meta label="Length" value={`${book.pages} pages`} />
      </View>
      <View style={[styles.rule, { backgroundColor: colors.border }]} />
      <Text style={[styles.sectionLabel, { color: colors.foreground }]}>About this work</Text>
      <Text style={[styles.description, { color: colors.mutedForeground }]}>{book.description}</Text>
      <Pressable onPress={() => router.push(`/reader/${book.id}`)} style={({ pressed }) => [styles.readButton, { backgroundColor: colors.primary }, pressed && styles.pressed]} testID="open-reader">
        <Feather name="book-open" size={17} color={colors.primaryForeground} />
        <Text style={[styles.readButtonText, { color: colors.primaryForeground }]}>Open reading room</Text>
        <Feather name="arrow-up-left" size={17} color={colors.primaryForeground} />
      </Pressable>
      <Text style={[styles.footnote, { color: colors.mutedForeground }]}>PDF edition · Optimized for reading on a small screen</Text>
    </ScreenShell>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  const colors = useColors();
  return <View style={styles.meta}><Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>{label}</Text><Text style={[styles.metaValue, { color: colors.foreground }]}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  topline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 1.8, textTransform: 'uppercase' },
  coverWrap: { alignItems: 'center', marginTop: 21, marginBottom: 25 },
  title: { fontFamily: 'Inter_700Bold', fontSize: 29, lineHeight: 34, letterSpacing: -0.6, textAlign: 'center' },
  subtitle: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 20, textAlign: 'center', maxWidth: 300, alignSelf: 'center', marginTop: 8 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 25 },
  meta: { flex: 1, gap: 5 },
  metaLabel: { fontFamily: 'Inter_400Regular', fontSize: 10 },
  metaValue: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  rule: { height: 1, marginBottom: 22 },
  sectionLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 17 },
  description: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 23, marginTop: 10 },
  readButton: { minHeight: 54, borderRadius: 17, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 27 },
  readButtonText: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  footnote: { fontFamily: 'Inter_400Regular', fontSize: 10, textAlign: 'center', marginTop: 13 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.985 }] },
  notFound: { alignItems: 'center', paddingTop: 100, gap: 10 },
  notFoundTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 17, marginTop: 8 },
  notFoundDetail: { fontFamily: 'Inter_400Regular', fontSize: 13 },
});