import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { GrupoProvider } from "@/context/groupcontext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GrupoProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="chat/[id]"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </GrupoProvider>
  );
}
