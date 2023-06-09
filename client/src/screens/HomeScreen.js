import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import Footer from '../components/Footer'
import { auth, db } from '../services/firebase'
import { formatNumber } from '../utils/format'

const HomeScreen = ({ navigation }) => {
  const displayName = auth.currentUser.displayName
  const avatarUrl = auth.currentUser.photoURL
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const unsubscribe = db.doc(`users/${auth.currentUser.uid}`).onSnapshot(snapshot => (
      setBalance(snapshot.data().balance)
    ))

    return unsubscribe
  }, [])

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Login')
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: { backgroundColor: '#FA9884', elevation: 0 },
      headerRight: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Ionicons
              name='exit-outline'
              size={25}
              color='#FFF'
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View style={styles.rootContainer}>
          <View style={styles.avatar}>
            <Avatar
              rounded
              size={50}
              source={{ uri: avatarUrl }}
            />
          </View>

          <Text style={styles.displayName}>
            {displayName}
          </Text>
        </View>
      ),
    })
  }, [navigation])

  return (
    <SafeAreaView>
      <StatusBar style="light" />

      <View style={styles.container}>
        <View style={styles.balanceDetails}>
          <View style={styles.textRow}>
            <Text style={styles.label}>ViettelPay</Text>
            <Text style={styles.value}>{formatNumber(balance)} đ</Text>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Tiền di động</Text>
            <Text style={styles.value}>0 đ</Text>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Viettel++</Text>
            <Text style={styles.value}>0 đ</Text>
          </View>
        </View>
      </View>

      <Footer navigation={navigation} currentTab={"Home"} />
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#E74646',
  },
  text: {
    fontWeight: 'semibold',
    color: '#8d99ae',
  },
  avatar: {
    padding: 10,
  },
  displayName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  balanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#8d99ae',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b2d42',
    marginTop: 6,
  },
});

export default HomeScreen
