import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import type { Book } from '@/data/library';
import { useLibrary } from '@/contexts/LibraryContext';

const logo = require('@/assets/images/scholar-logo.png');

export function BrandMark({ compact = false }: { compact?: boolean }) {
  const colors = useColors();
  return (
    <View style={styles.brandRow}>
      <Image source={logo} style={[styles.logo, compact && styles.logoCompact]} resizeMode="contain" />
      {!compact && (
        <View>
          <Text style={[styles.brandName, { color: colors.foreground }]}>The Study Library</Text>
          <Text style={[styles.brandMeta, { color: colors.mutedForeground }]}>A quiet shelf of works</Text>
        </View>
      )}
    </View>
  );
}

export function ScreenShell({ children, scroll = true }: { children: React.ReactNode; scroll?: boolean }) {
  const colors = useColors();
  const Container = scroll ? ScrollView : View;
  return (
    <Container
      style={[styles.shell, { backgroundColor: colors.background }]}
      contentContainerStyle={scroll ? styles.shellContent : undefined}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </Container>
  );
}

export function IconButton({
  name,
  onPress,
  accessibilityLabel,
  active = false,
}: {
  name: keyof typeof Feather.glyphMap;
  onPress: () => void;
  accessibilityLabel: string;
  active?: boolean;
}) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      testID={`icon-${name}`}
      style={({ pressed }) => [
        styles.iconButton,
        { backgroundColor: active ? colors.secondary : colors.card, borderColor: colors.border },
        pressed && styles.pressed,
      ]}
    >
      <Feather name={name} size={18} color={active ? colors.primary : colors.foreground} />
    </Pressable>
  );
}

export function SearchField({ value, onChangeText }: { value: string; onChangeText: (value: string) => void }) {
  const colors = useColors();
  return (
    <View style={[styles.searchField, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Feather name="search" size={18} color={colors.mutedForeground} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search the shelf"
        placeholderTextColor={colors.mutedForeground}
        style={[styles.searchInput, { color: colors.foreground }]}
        returnKeyType="search"
        testID="library-search"
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} hitSlop={12} accessibilityLabel="Clear search">
          <Feather name="x-circle" size={17} color={colors.mutedForeground} />
        </Pressable>
      )}
    </View>
  );
}

export function BookCover({ book, large = false }: { book: Book; large?: boolean }) {
  const colors = useColors();
  return (
    <View style={[styles.cover, large ? styles.coverLarge : styles.coverSmall, { backgroundColor: book.color }]}>
      <View style={[styles.coverRule, { backgroundColor: book.accent }]} />
      <Text style={[styles.coverCategory, { color: book.accent }]}>{book.category}</Text>
      <Text style={[styles.coverTitle, large && styles.coverTitleLarge]}>{book.title}</Text>
      <View style={styles.coverBottom}>
        <Text style={[styles.coverAuthor, { color: colors.background }]}>Selected works</Text>
        <Text style={[styles.coverYear, { color: book.accent }]}>{book.year}</Text>
      </View>
    </View>
  );
}

export function BookCard({ book, onPress }: { book: Book; onPress: () => void }) {
  const colors = useColors();
  const { favorites, toggleFavorite } = useLibrary();
  const isFavorite = favorites.includes(book.id);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.bookCard, { backgroundColor: colors.card, borderColor: colors.border }, pressed && styles.cardPressed]}
      accessibilityRole="button"
      testID={`book-${book.id}`}
    >
      <BookCover book={book} />
      <View style={styles.bookInfo}>
        <View style={styles.bookTopline}>
          <Text style={[styles.bookCategory, { color: colors.primary }]}>{book.category}</Text>
          <Pressable onPress={() => toggleFavorite(book.id)} hitSlop={10} accessibilityLabel={isFavorite ? 'Remove favorite' : 'Save favorite'}>
            <Ionicons name={isFavorite ? 'bookmark' : 'bookmark-outline'} size={19} color={isFavorite ? colors.primary : colors.mutedForeground} />
          </Pressable>
        </View>
        <Text style={[styles.bookTitle, { color: colors.foreground }]} numberOfLines={2}>{book.title}</Text>
        <Text style={[styles.bookSubtitle, { color: colors.mutedForeground }]} numberOfLines={2}>{book.subtitle}</Text>
        <Text style={[styles.bookMeta, { color: colors.mutedForeground }]}>{book.language}  ·  {book.pages} pages</Text>
        {typeof book.progress === 'number' && (
          <View style={styles.progressRow}>
            <View style={[styles.progressTrack, { backgroundColor: colors.muted }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${book.progress * 100}%` }]} />
            </View>
            <Text style={[styles.progressText, { color: colors.mutedForeground }]}>{Math.round(book.progress * 100)}%</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export function LoadingShelf() {
  const colors = useColors();
  return (
    <View style={styles.loadingWrap}>
      <ActivityIndicator color={colors.primary} />
      <Text style={[styles.loadingText, { color: colors.mutedForeground }]}>Opening the shelf…</Text>
    </View>
  );
}

export function EmptyShelf({ title, detail }: { title: string; detail: string }) {
  const colors = useColors();
  return (
    <View style={[styles.empty, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
      <View style={[styles.emptyIcon, { backgroundColor: colors.card }]}>
        <Feather name="book-open" size={22} color={colors.primary} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.foreground }]}>{title}</Text>
      <Text style={[styles.emptyDetail, { color: colors.mutedForeground }]}>{detail}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  shell: { flex: 1 },
  shellContent: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 48 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 44, height: 44, borderRadius: 22 },
  logoCompact: { width: 32, height: 32, borderRadius: 16 },
  brandName: { fontFamily: 'Inter_600SemiBold', fontSize: 15, letterSpacing: -0.2 },
  brandMeta: { fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 2 },
  iconButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 20 },
  pressed: { opacity: 0.7, transform: [{ scale: 0.96 }] },
  searchField: { height: 50, borderWidth: 1, borderRadius: 16, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', gap: 10 },
  searchInput: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 15, paddingVertical: 0 },
  bookCard: { flexDirection: 'row', gap: 14, padding: 12, borderWidth: 1, borderRadius: 18, marginBottom: 12 },
  cardPressed: { opacity: 0.8, transform: [{ scale: 0.985 }] },
  cover: { borderRadius: 10, padding: 11, justifyContent: 'space-between', overflow: 'hidden' },
  coverSmall: { width: 94, height: 136 },
  coverLarge: { width: 164, height: 236 },
  coverRule: { height: 2, width: 30, marginBottom: 9 },
  coverCategory: { fontFamily: 'Inter_500Medium', fontSize: 8, letterSpacing: 1, textTransform: 'uppercase' },
  coverTitle: { color: '#fffaf4', fontFamily: 'Inter_700Bold', fontSize: 15, lineHeight: 18, marginTop: 8 },
  coverTitleLarge: { fontSize: 22, lineHeight: 27 },
  coverBottom: { gap: 3 },
  coverAuthor: { fontFamily: 'Inter_500Medium', fontSize: 8, opacity: 0.9 },
  coverYear: { fontFamily: 'Inter_400Regular', fontSize: 8 },
  bookInfo: { flex: 1, paddingVertical: 1 },
  bookTopline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bookCategory: { fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase' },
  bookTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 17, lineHeight: 21, marginTop: 7 },
  bookSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17, marginTop: 4 },
  bookMeta: { fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 9 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 9 },
  progressTrack: { flex: 1, height: 4, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 4, borderRadius: 4 },
  progressText: { fontFamily: 'Inter_500Medium', fontSize: 9 },
  loadingWrap: { paddingVertical: 52, alignItems: 'center', gap: 12 },
  loadingText: { fontFamily: 'Inter_400Regular', fontSize: 13 },
  empty: { alignItems: 'center', padding: 28, borderRadius: 20, borderWidth: 1, marginTop: 12 },
  emptyIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  emptyTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 16 },
  emptyDetail: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19, textAlign: 'center', maxWidth: 260, marginTop: 5 },
});