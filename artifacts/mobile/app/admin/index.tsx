import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { books as sampleBooks } from '@/data/library';
import { ScreenShell } from '@/components/LibraryUi';

export default function AdminScreen() {
  const colors = useColors();
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [localBooks, setLocalBooks] = useState(sampleBooks);

  if (!authenticated) {
    return (
      <ScreenShell>
        <View style={styles.lockIntro}><View style={[styles.lockIcon, { backgroundColor: colors.secondary }]}><Feather name="lock" size={22} color={colors.primary} /></View><Text style={[styles.heading, { color: colors.foreground }]}>The library desk</Text><Text style={[styles.detail, { color: colors.mutedForeground }]}>A protected place to prepare new editions, review metadata, and care for the shelf.</Text></View>
        <View style={[styles.form, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.foreground }]}>Editor email</Text>
          <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="name@library.org" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, borderColor: colors.input }]} />
          <Text style={[styles.label, { color: colors.foreground, marginTop: 17 }]}>Passcode</Text>
          <TextInput value={passcode} onChangeText={setPasscode} secureTextEntry placeholder="••••••••" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, borderColor: colors.input }]} />
          <Pressable onPress={() => { if (!email.trim() || !passcode.trim()) { Alert.alert('A little more is needed', 'Enter your email and passcode to continue.'); return; } setAuthenticated(true); }} style={({ pressed }) => [styles.primaryButton, { backgroundColor: colors.primary }, pressed && styles.pressed]} testID="admin-sign-in"><Text style={[styles.primaryText, { color: colors.primaryForeground }]}>Continue to desk</Text><Feather name="arrow-up-left" size={17} color={colors.primaryForeground} /></Pressable>
          <Text style={[styles.formNote, { color: colors.mutedForeground }]}>Authentication will connect here when the protected service is ready.</Text>
        </View>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <View style={styles.deskHeader}><View><Text style={[styles.eyebrow, { color: colors.primary }]}>CURATOR VIEW</Text><Text style={[styles.heading, { color: colors.foreground }]}>Good evening.</Text></View><View style={[styles.statusDot, { backgroundColor: colors.accent }]}><Feather name="check" size={15} color={colors.foreground} /></View></View>
      <View style={styles.stats}><Stat label="On shelf" value={`${localBooks.length}`} /><Stat label="Languages" value="03" /><Stat label="Drafts" value="02" /></View>
      <View style={styles.sectionHead}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Manage editions</Text><Pressable onPress={() => setShowForm((value) => !value)} accessibilityLabel="Add edition"><Feather name={showForm ? 'x' : 'plus'} size={21} color={colors.primary} /></Pressable></View>
      {showForm && <View style={[styles.addForm, { backgroundColor: colors.secondary, borderColor: colors.border }]}><Text style={[styles.label, { color: colors.foreground }]}>New edition title</Text><TextInput value={title} onChangeText={setTitle} placeholder="Enter a title" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, borderColor: colors.input, backgroundColor: colors.card }]} /><Pressable onPress={() => { if (!title.trim()) return; setLocalBooks((items) => [{ ...items[0], id: `draft-${Date.now()}`, title: title.trim(), subtitle: 'New draft awaiting review' }, ...items]); setTitle(''); setShowForm(false); }} style={[styles.smallButton, { backgroundColor: colors.primary }]}><Text style={[styles.primaryText, { color: colors.primaryForeground }]}>Save draft</Text></Pressable></View>}
      <View style={styles.editions}>{localBooks.slice(0, 5).map((book) => <View key={book.id} style={[styles.edition, { borderBottomColor: colors.border }]}><View style={[styles.editionIcon, { backgroundColor: book.color }]}><Feather name="file-text" size={15} color={book.accent} /></View><View style={styles.editionCopy}><Text style={[styles.editionTitle, { color: colors.foreground }]} numberOfLines={1}>{book.title}</Text><Text style={[styles.editionMeta, { color: colors.mutedForeground }]}>{book.language} · {book.category}</Text></View><Text style={[styles.published, { color: colors.primary }]}>{book.id.startsWith('draft') ? 'Draft' : 'Live'}</Text></View>)}</View>
      <View style={[styles.protectedNote, { backgroundColor: colors.secondary, borderColor: colors.border }]}><Feather name="info" size={16} color={colors.primary} /><Text style={[styles.protectedText, { color: colors.mutedForeground }]}>This is a local preview of the curator workspace. Publishing, file upload, and permissions are ready for the protected service.</Text></View>
    </ScreenShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const colors = useColors();
  return <View style={[styles.stat, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[styles.statValue, { color: colors.foreground }]}>{value}</Text><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  lockIntro: { alignItems: 'center', paddingTop: 35, paddingBottom: 28 },
  lockIcon: { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', marginBottom: 17 },
  heading: { fontFamily: 'Inter_700Bold', fontSize: 28, letterSpacing: -0.6 },
  detail: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 21, textAlign: 'center', maxWidth: 320, marginTop: 10 },
  form: { borderWidth: 1, borderRadius: 20, padding: 18 },
  label: { fontFamily: 'Inter_600SemiBold', fontSize: 12, marginBottom: 8 },
  input: { height: 48, borderWidth: 1, borderRadius: 13, paddingHorizontal: 13, fontFamily: 'Inter_400Regular', fontSize: 14 },
  primaryButton: { minHeight: 52, borderRadius: 15, marginTop: 20, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  primaryText: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  formNote: { fontFamily: 'Inter_400Regular', fontSize: 10, lineHeight: 15, textAlign: 'center', marginTop: 14 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.985 }] },
  deskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12 },
  eyebrow: { fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 1.7, marginBottom: 8 },
  statusDot: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  stats: { flexDirection: 'row', gap: 9, marginTop: 27, marginBottom: 31 },
  stat: { flex: 1, minHeight: 77, borderWidth: 1, borderRadius: 16, padding: 12, justifyContent: 'space-between' },
  statValue: { fontFamily: 'Inter_700Bold', fontSize: 23 },
  statLabel: { fontFamily: 'Inter_400Regular', fontSize: 10 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 },
  sectionTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 17 },
  addForm: { padding: 13, borderWidth: 1, borderRadius: 16, marginBottom: 10, gap: 2 },
  smallButton: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, marginTop: 10 },
  editions: { borderTopWidth: 1, borderTopColor: 'transparent' },
  edition: { minHeight: 68, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 11 },
  editionIcon: { width: 35, height: 42, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  editionCopy: { flex: 1 },
  editionTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  editionMeta: { fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 4 },
  published: { fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  protectedNote: { padding: 14, flexDirection: 'row', gap: 10, borderWidth: 1, borderRadius: 16, marginTop: 25 },
  protectedText: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 17 },
});