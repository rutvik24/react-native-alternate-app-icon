import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  getActiveIcon,
  getAllAlternativeIcons,
  resetIcon,
  setIcon,
} from 'react-native-alternate-app-icon'

function App(): React.JSX.Element {
  const [activeIcon, setActiveIcon] = useState<string>('...')
  const [icons, setIcons] = useState<string[]>([])
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [current, available] = await Promise.all([
          getActiveIcon(),
          getAllAlternativeIcons(),
        ])
        setActiveIcon(current)
        setIcons(available)
      } catch (error) {
        setStatus(error instanceof Error ? error.message : String(error))
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleSetIcon = async (iconName: string) => {
    setStatus('')
    try {
      const message = await setIcon(iconName)
      setStatus(message)
      setActiveIcon(await getActiveIcon())
    } catch (error) {
      setStatus(error instanceof Error ? error.message : String(error))
    }
  }

  const handleReset = async () => {
    setStatus('')
    try {
      const message = await resetIcon()
      setStatus(message)
      setActiveIcon(await getActiveIcon())
    } catch (error) {
      setStatus(error instanceof Error ? error.message : String(error))
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alternate App Icon</Text>
      <Text style={styles.subtitle}>Active icon: {activeIcon}</Text>

      {icons.map((icon) => (
        <Pressable
          key={icon}
          style={styles.button}
          onPress={() => handleSetIcon(icon)}
        >
          <Text style={styles.buttonText}>Set {icon}</Text>
        </Pressable>
      ))}

      <Pressable style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset icon</Text>
      </Pressable>

      {status ? <Text style={styles.status}>{status}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  status: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
})

export default App
