import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { books } from '@/data/library';

export default function ReaderScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const book = books.find((item) => item.id === id) ?? books[0];
  const [nightReading, setNightReading] = useState(false);
  const [page, setPage] = useState(1);
  const maxPage = 18;
  const paper = nightReading ? '#382e29' : '#fffaf1';
  const paperInk = nightReading ? '#f1e4d4' : colors.foreground;

  return (
    <View style={[styles.container, { backgroundColor: nightReading ? '#251f1c' : colors.background }]}>
      <View style={styles.readerHeader}>
        <View style={styles.readerTitle}><Feather name="file-text" size={18} color={colors.primary} /><View><Text style={[styles.readerKicker, { color: colors.mutedForeground }]}>READING ROOM</Text><Text style={[styles.readerBook, { color: nightReading ? colors.background : colors.foreground }]} numberOfLines={1}>{book.title}</Text></View></View>
        <Pressable onPress={() => setNightReading((value) => !value)} style={[styles.modeButton, { borderColor: colors.border }]} accessibilityLabel="Toggle reading mode"><Feather name={nightReading ? 'sun' : 'moon'} size={17} color={nightReading ? colors.background : colors.foreground} /></Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.readerContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.pdfPaper, { backgroundColor: paper }]}>
          <Text style={[styles.pdfKicker, { color: colors.primary }]}>CHAPTER ONE</Text>
          <Text style={[styles.pdfTitle, { color: paperInk }]}>The intention{'\n'}behind learning</Text>
          <View style={[styles.pdfLine, { backgroundColor: colors.accent }]} />
          <Text style={[styles.pdfBody, { color: paperInk }]}>
            Knowledge begins as an act of attention. Before the page opens, the student makes a small promise: to be present, to ask honestly, and to carry what is learned with care.
          </Text>
          <Text style={[styles.pdfBody, { color: paperInk }]}>
            The purpose of study is not to gather what can be repeated, but to become more truthful in the way one sees, speaks, and serves. A good book leaves a door open.
          </Text>
          <Text style={[styles.pdfQuote, { color: paperInk, borderLeftColor: colors.accent }]}>“Read until the words become a way of looking.”</Text>
          <Text style={[styles.pdfBody, { color: paperInk }]}>
            Return to the first question often. The work deepens each time we approach it with a little less certainty and a little more patience.
          </Text>
          <Text style={[styles.pageNumber, { color: nightReading ? colors.muted : colors.mutedForeground }]}>{page}</Text>
        </View>
      </ScrollView>
      <View style={[styles.readerControls, { backgroundColor: nightReading ? '#2e2622' : colors.card, borderTopColor: colors.border }]}>
        <Pressable onPress={() => setPage((current) => Math.max(1, current - 1))} style={styles.control} accessibilityLabel="Previous page"><Feather name="chevron-left" size={20} color={page === 1 ? colors.mutedForeground : colors.foreground} /></Pressable>
        <View style={styles.pageProgress}><View style={[styles.pageTrack, { backgroundColor: colors.muted }]}><View style={[styles.pageFill, { backgroundColor: colors.primary, width: `${(page / maxPage) * 100}%` }]} /></View><Text style={[styles.pageText, { color: nightReading ? colors.background : colors.mutedForeground }]}>{page} / {maxPage}</Text></View>
        <Pressable onPress={() => setPage((current) => Math.min(maxPage, current + 1))} style={styles.control} accessibilityLabel="Next page"><Feather name="chevron-right" size={20} color={page === maxPage ? colors.mutedForeground : colors.foreground} /></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  readerHeader: { paddingHorizontal: 18, paddingTop: 17, paddingBottom: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  readerTitle: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  readerKicker: { fontFamily: 'Inter_600SemiBold', fontSize: 9, letterSpacing: 1.4 },
  readerBook: { fontFamily: 'Inter_600SemiBold', fontSize: 13, marginTop: 3, maxWidth: 220 },
  modeButton: { width: 38, height: 38, borderWidth: 1, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  readerContent: { padding: 18, paddingBottom: 30 },
  pdfPaper: { minHeight: 600, paddingHorizontal: 27, paddingTop: 38, paddingBottom: 24, borderRadius: 3, shadowColor: '#2c211b', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 2 },
  pdfKicker: { fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 1.8 },
  pdfTitle: { fontFamily: 'Inter_700Bold', fontSize: 29, lineHeight: 35, marginTop: 18, letterSpacing: -0.6 },
  pdfLine: { width: 38, height: 3, marginVertical: 25 },
  pdfBody: { fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 27, marginBottom: 21 },
  pdfQuote: { fontFamily: 'Inter_500Medium', fontSize: 16, lineHeight: 25, borderLeftWidth: 2, paddingLeft: 15, marginBottom: 24 },
  pageNumber: { fontFamily: 'Inter_500Medium', fontSize: 11, textAlign: 'center', marginTop: 'auto' },
  readerControls: { minHeight: 70, borderTopWidth: 1, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', gap: 12 },
  control: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  pageProgress: { flex: 1, gap: 7 },
  pageTrack: { height: 4, borderRadius: 4, overflow: 'hidden' },
  pageFill: { height: 4, borderRadius: 4 },
  pageText: { fontFamily: 'Inter_500Medium', fontSize: 10, textAlign: 'center' },
});