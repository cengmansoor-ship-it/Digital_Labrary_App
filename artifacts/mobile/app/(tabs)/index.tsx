import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { books, categories } from '@/data/library';
import { useLibrary } from '@/contexts/LibraryContext';
import { BookCard, BrandMark, EmptyShelf, IconButton, ScreenShell, SearchField } from '@/components/LibraryUi';

export default function LibraryHome() {
  const colors = useColors();
  const router = useRouter();
  const { favorites } = useLibrary();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [showSaved, setShowSaved] = useState(false);
  const isTablet = width >= 650;

  const visibleBooks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return books.filter((book) => {
      const matchesQuery = !normalized || `${book.title} ${book.subtitle} ${book.language}`.toLowerCase().includes(normalized);
      const matchesCategory = category === 'All' || book.category === category;
      const matchesSaved = !showSaved || favorites.includes(book.id);
      return matchesQuery && matchesCategory && matchesSaved;
    });
  }, [category, favorites, query, showSaved]);

  return (
    <ScreenShell>
      <View style={[styles.maxWidth, isTablet && styles.tablet]}>
        <View style={styles.header}>
          <BrandMark />
          <View style={styles.headerActions}>
            <IconButton name="bookmark" onPress={() => setShowSaved((value) => !value)} accessibilityLabel="Show saved books" active={showSaved} />
            <IconButton name="shield" onPress={() => router.push('/admin')} accessibilityLabel="Open library desk" />
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>THE SHELF</Text>
          <Text style={[styles.heading, { color: colors.foreground }]}>Read slowly.{'\n'}Keep what matters.</Text>
          <Text style={[styles.description, { color: colors.mutedForeground }]}>
            Browse the published works, essays, and study notes of one life devoted to knowledge.
          </Text>
        </View>

        <SearchField value={query} onChangeText={setQuery} />
        <View style={styles.filtersHeader}>
          <Text style={[styles.sectionLabel, { color: colors.foreground }]}>{showSaved ? 'Saved for later' : 'All works'}</Text>
          <Text style={[styles.count, { color: colors.mutedForeground }]}>{visibleBooks.length} titles</Text>
        </View>
        <View style={styles.chips}>
          {categories.map((item) => {
            const selected = item === category;
            return (
              <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, { backgroundColor: selected ? colors.primary : colors.card, borderColor: selected ? colors.primary : colors.border }]}>
                <Text style={[styles.chipText, { color: selected ? colors.primaryForeground : colors.mutedForeground }]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        {visibleBooks.length > 0 ? (
          <View style={styles.bookGrid}>
            {visibleBooks.map((book) => <BookCard key={book.id} book={book} onPress={() => router.push(`/book/${book.id}`)} />)}
          </View>
        ) : (
          <EmptyShelf title={showSaved ? 'Your saved shelf is quiet' : 'No titles found'} detail={showSaved ? 'Tap the bookmark on a book to keep it close.' : 'Try a different phrase or return to all works.'} />
        )}

        <Pressable onPress={() => router.push('/admin')} style={({ pressed }) => [styles.adminEntry, { borderColor: colors.border, backgroundColor: colors.secondary }, pressed && styles.pressed]}>
          <View style={[styles.adminIcon, { backgroundColor: colors.card }]}><Feather name="lock" size={16} color={colors.primary} /></View>
          <View style={styles.adminCopy}><Text style={[styles.adminTitle, { color: colors.foreground }]}>Library desk</Text><Text style={[styles.adminDetail, { color: colors.mutedForeground }]}>Protected space for curators and editors</Text></View>
          <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
        </Pressable>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  maxWidth: { width: '100%', alignSelf: 'center' },
  tablet: { maxWidth: 720 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerActions: { flexDirection: 'row', gap: 8 },
  hero: { paddingTop: 37, paddingBottom: 24 },
  eyebrow: { fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 1.8 },
  heading: { fontFamily: 'Inter_700Bold', fontSize: 32, lineHeight: 37, letterSpacing: -0.8, marginTop: 10 },
  description: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 21, maxWidth: 340, marginTop: 12 },
  filtersHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 25, marginBottom: 12 },
  sectionLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 17 },
  count: { fontFamily: 'Inter_400Regular', fontSize: 11 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 18 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  chipText: { fontFamily: 'Inter_500Medium', fontSize: 11 },
  bookGrid: { gap: 0 },
  adminEntry: { flexDirection: 'row', alignItems: 'center', padding: 13, borderWidth: 1, borderRadius: 18, marginTop: 18, gap: 11 },
  adminIcon: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 17 },
  adminCopy: { flex: 1 },
  adminTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  adminDetail: { fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 3 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
});
