import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useLibrary } from '@/contexts/LibraryContext';

const welcomeImage = require('@/assets/images/welcome-study.png');

export default function WelcomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { hasSeenWelcome, isHydrated, markWelcomeSeen } = useLibrary();
  const fade = useRef(new Animated.Value(0)).current;
  const lift = useRef(new Animated.Value(18)).current;
  const hasEntered = useRef(false);

  const enterLibrary = () => {
    if (hasEntered.current) return;
    hasEntered.current = true;
    markWelcomeSeen();
    router.replace('/(tabs)');
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 650, useNativeDriver: true }),
      Animated.timing(lift, { toValue: 0, duration: 650, useNativeDriver: true }),
    ]).start();
  }, [fade, lift]);

  useEffect(() => {
    if (isHydrated && hasSeenWelcome) {
      const timer = setTimeout(() => router.replace('/(tabs)'), 650);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [hasSeenWelcome, isHydrated, router]);

  useEffect(() => {
    if (!isHydrated || hasSeenWelcome) return undefined;
    const timer = setTimeout(enterLibrary, 5000);
    return () => clearTimeout(timer);
  }, [hasSeenWelcome, isHydrated]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ImageBackground source={welcomeImage} resizeMode="cover" style={styles.image}>
        <View style={styles.imageWash} />
        <Animated.View style={[styles.copy, { opacity: fade, transform: [{ translateY: lift }], paddingTop: insets.top + 34 }]}>
          <Text style={[styles.kicker, { color: colors.accent }]}>THE STUDY LIBRARY</Text>
          <Text style={[styles.title, { color: colors.background }]}>A room for{'\n'}returning to the page.</Text>
          <Text style={[styles.intro, { color: colors.background }]}>
            The collected works of a scholar, kept close for quiet reading and careful study.
          </Text>
        </Animated.View>
        <Animated.View style={[styles.footer, { opacity: fade, paddingBottom: Math.max(insets.bottom, 22) }]}>
          <Text style={[styles.note, { color: colors.background }]}>Arabic · Pashto · Persian</Text>
          <Pressable onPress={enterLibrary} style={({ pressed }) => [styles.enterButton, { backgroundColor: colors.accent }, pressed && styles.pressed]} testID="enter-library">
            <Text style={[styles.enterText, { color: colors.foreground }]}>Enter the library</Text>
            <Feather name="arrow-up-left" size={18} color={colors.foreground} />
          </Pressable>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { flex: 1, justifyContent: 'space-between' },
  imageWash: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(44,33,27,0.48)' },
  copy: { paddingHorizontal: 24, maxWidth: 560 },
  kicker: { fontFamily: 'Inter_600SemiBold', fontSize: 11, letterSpacing: 2.2 },
  title: { fontFamily: 'Inter_700Bold', fontSize: 37, lineHeight: 43, letterSpacing: -1.1, marginTop: 17 },
  intro: { fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 23, maxWidth: 300, marginTop: 18, opacity: 0.9 },
  footer: { paddingHorizontal: 24, gap: 13 },
  note: { fontFamily: 'Inter_500Medium', fontSize: 11, letterSpacing: 0.4 },
  enterButton: { minHeight: 56, borderRadius: 18, paddingHorizontal: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  enterText: { fontFamily: 'Inter_600SemiBold', fontSize: 15 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.985 }] },
});