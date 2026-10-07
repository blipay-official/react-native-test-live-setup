import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

import { checkMockApi, MockApiStatus } from '@/setupCheck';

export default function App() {
  const [status, setStatus] = useState<MockApiStatus | null>(null);

  const run = () => {
    setStatus(null);
    checkMockApi().then(setStatus);
  };

  useEffect(run, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Credit Analyses — setup check</Text>
      {status === null && <ActivityIndicator />}
      {status?.ok && <Text style={styles.ok}>Setup OK: the app reached the mock API.</Text>}
      {status && !status.ok && (
        <>
          <Text style={styles.error}>Could not reach the mock API at {status.url}.</Text>
          <Text style={styles.hint}>Is `npm run mock-api` running? See the README.</Text>
          <Button title="Try again" onPress={run} />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700' },
  ok: { color: '#1B7F3B', textAlign: 'center' },
  error: { color: '#B3261E', textAlign: 'center' },
  hint: { color: '#666', textAlign: 'center' },
});
