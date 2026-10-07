import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, FolderOpen, Sparkles } from 'lucide-react-native';
import { Colors } from '../constants/Colors';

export default function DashboardScreen() {
  const router = useRouter();

  // Basic calculation for universal day (e.g. 2026 -> 2+0+2+6 = 10 -> 1)
  const today = new Date();
  const dateStr = today.toLocaleDateString('tr-TR'); // "01.10.2026"
  const universalEnergy = dateStr.replace(/\D/g, '').split('').reduce((a, b) => a + parseInt(b), 0);
  const finalEnergy = universalEnergy > 9 ? (universalEnergy % 9 === 0 ? 9 : universalEnergy % 9) : universalEnergy;

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Image 
          source={require('../assets/icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Numerio'ya Hoş Geldiniz</Text>
        <Text style={styles.subText}>Profesyonel Numeroloji ve Çakra Analiz Asistanınız</Text>
      </View>

      <View style={styles.energyCard}>
        <View style={styles.energyHeader}>
          <Sparkles color="#fff" size={20} />
          <Text style={styles.energyTitle}>Günün Evrensel Enerjisi</Text>
        </View>
        <Text style={styles.energyNumber}>{finalEnergy}</Text>
        <Text style={styles.energyDesc}>
          Bugün evrensel olarak {finalEnergy} rakamının teması hakim. (Hesaplama: {dateStr})
        </Text>
      </View>

      <View style={styles.actionGrid}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/analysis/new')}>
          <Plus color="#fff" size={32} />
          <Text style={styles.primaryButtonText}>Yeni Analiz Başlat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionGrid}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/archive')}>
          <FolderOpen color={Colors.light.primary} size={28} />
          <Text style={styles.secondaryButtonText}>Arşivi Görüntüle</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  headerArea: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: 6,
  },
  subText: {
    fontSize: 14,
    color: Colors.light.secondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  energyCard: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  energyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  energyTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  energyNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  energyDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  actionGrid: {
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  secondaryButton: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  }
});
