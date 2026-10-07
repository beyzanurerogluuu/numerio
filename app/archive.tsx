import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { ChevronRight, Trash2 } from 'lucide-react-native';
import { Colors } from '../constants/Colors';
import { useClientStore, ClientData } from '../store/clientStore';

export default function ArchiveScreen() {
  const router = useRouter();
  const clients = useClientStore((state) => state.clients);
  const deleteClient = useClientStore((state) => state.deleteClient);

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      "Çalışmayı Sil",
      `${name} isimli danışanın kaydını silmek istediğinize emin misiniz?`,
      [
        { text: "İptal", style: "cancel" },
        { 
          text: "Sil", 
          style: "destructive", 
          onPress: () => deleteClient(id) 
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: ClientData }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity 
        style={styles.card}
        onPress={() => router.push(`/analysis/${item.id}`)}
      >
        <View>
          <Text style={styles.clientName}>{item.name}</Text>
          <Text style={styles.clientDate}>Doğum: {item.dob} | Analiz: {item.date}</Text>
        </View>
        <ChevronRight color={Colors.light.primary} size={24} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id, item.name)}
      >
        <Trash2 color="#fff" size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Tüm Danışanlar ({clients.length})</Text>
      
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Henüz bir analiz bulunmuyor.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.secondary,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: Colors.light.error,
    padding: 16,
    borderRadius: 12,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  clientDate: {
    fontSize: 13,
    color: Colors.light.secondary,
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.light.text,
    fontStyle: 'italic',
  }
});
