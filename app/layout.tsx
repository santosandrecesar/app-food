import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { loadAsync } from '@expo/font';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Load Expo fonts
    loadAsync({
      ...require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
    }).catch((err) => {
      console.warn('Error loading fonts:', err);
    });
  }, []);

  return (
    <html lang="en">
      <body>
        <NavigationContainer>{children}</NavigationContainer>
      </body>
    </html>
  );
}

AppRegistry.registerComponent('Main', () => RootLayout);