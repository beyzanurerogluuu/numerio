import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { calculatePinCode } from '../../utils/pinCode';
import { useClientStore } from '../../store/clientStore';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function AnalysisScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const addClient = useClientStore((state) => state.addClient);
  const updateClient = useClientStore((state) => state.updateClient);
  const getClient = useClientStore((state) => state.getClient);
  
  // Basic Info State
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [pinCode, setPinCode] = useState<string[]>(Array(9).fill(''));

  // Chakras State (1 to 10)
  const [chakras, setChakras] = useState<Record<string, string>>({});
  
  // New Fields
  const [bereketKodu, setBereketKodu] = useState('');
  const [zenginIsik, setZenginIsik] = useState('');

  // Load existing data if opening a saved client
  useEffect(() => {
    if (id && id !== 'new') {
      const client = getClient(id as string);
      if (client) {
        setName(client.name);
        setDob(client.dob);
        setPinCode(client.pinCode);
        setChakras(client.chakras);
        // Extract special codes from notes if they exist (simple parsing for now)
        if (client.ozelNotlar) {
          const lines = client.ozelNotlar.split('\n');
          setBereketKodu(lines[0]?.replace('Bereket Kodu: ', '') || '');
          setZenginIsik(lines[1]?.replace('Zengin/Işık Numaran: ', '') || '');
        }
      }
    }
  }, [id]);

  const handleDobChange = (text: string) => {
    let cleaned = text.replace(/\D/g, ''); 
    let match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
    if (match) {
      let formatted = !match[2] ? match[1] : `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}`;
      setDob(formatted);
    } else {
      setDob(text);
    }
  };

  const handleAutoCalculate = () => {
    if (dob.length >= 8) {
      const calculated = calculatePinCode(dob);
      setPinCode(calculated);
    } else {
      Alert.alert("Hata", "Lütfen doğum tarihini eksiksiz girin (Örn: 20.03.2006)");
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Hata", "Lütfen danışanın adını girin.");
      return;
    }
    
    const clientData = {
      name,
      date: new Date().toLocaleDateString('tr-TR'),
      dob,
      ruhGudusu: '', sessizGudu: '', ifade: '', kisiselYil: '',
      pinCode,
      elements: { ates: '', su: '', toprak: '', hava: '', notr: '' },
      zirveYillari: '', kararYillari: '',
      chakras,
      haneler: {},
      hastalikUyarisi: '',
      ebcedHesabi: { zekaAkil: '', esma: '', sure: '' },
      ozelNotlar: `Bereket Kodu: ${bereketKodu}\nZengin/Işık Numaran: ${zenginIsik}`
    };

    if (id && id !== 'new') {
      updateClient(id as string, clientData);
    } else {
      addClient({ id: Date.now().toString(), ...clientData });
    }
    
    router.back();
  };

  const chakraTitles = [
    "1. ÇAKRA (Özgüven, Liderlik)", "2. ÇAKRA (İşbirliği, Duygular)", "3. ÇAKRA (İfade, Yaratıcılık)",
    "4. ÇAKRA (Düzen, İstikrar, Kalp)", "5. ÇAKRA (Özgürlük, İletişim)", "6. ÇAKRA (Aile, Sorumluluk, Denge)",
    "7. ÇAKRA (Analiz, Ruhsallık)", "8. ÇAKRA (Otorite, Başarı, Bolluk)", "9. ÇAKRA (Şifa, Bilgelik, Merhamet)",
    "10. ÇAKRA (Yüksek bilinç, İdealist)"
  ];

  const generatePDF = async () => {
    // PDF HTML Template
    const htmlContent = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FDFBF7; color: #111827; margin: 0; padding: 40px; }
            .header { text-align: center; border-bottom: 2px solid #1D3557; padding-bottom: 20px; margin-bottom: 30px; }
            .title { color: #1D3557; font-size: 32px; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 2px; }
            .subtitle { color: #457B9D; font-size: 18px; margin-top: 8px; }
            .section { margin-bottom: 30px; }
            .section-title { background-color: #1D3557; color: white; padding: 12px 16px; border-radius: 8px; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; }
            .grid { display: flex; flex-wrap: wrap; margin-top: 15px; justify-content: space-between; }
            .box { width: 31%; background-color: white; border: 1px solid #E2E8F0; padding: 15px 0; margin-bottom: 15px; text-align: center; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
            .box-title { font-size: 12px; color: #457B9D; margin-bottom: 5px; font-weight: bold; text-transform: uppercase; }
            .box-value { font-size: 28px; color: #1D3557; font-weight: bold; }
            .text-block { background-color: white; padding: 16px; border-left: 4px solid #1D3557; margin-top: 15px; border-radius: 0 8px 8px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); line-height: 1.6; }
            .codes { background-color: #E6F4FE; padding: 20px; border-radius: 8px; text-align: center; margin-top: 40px; border: 2px dashed #457B9D; }
            .footer { text-align: center; margin-top: 50px; color: #A0AEC0; font-size: 12px; border-top: 1px solid #E2E8F0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">Numerio Analiz Raporu</h1>
            <p class="subtitle">Danışan: <strong>${name || 'İsimsiz'}</strong> | Doğum Tarihi: <strong>${dob || '-'}</strong></p>
          </div>

          <div class="section">
            <h2 class="section-title">Pin Kodu Haneleri</h2>
            <div class="grid">
              ${pinCode.map((val, i) => `<div class="box"><div class="box-title">${i+1}. Hane</div><div class="box-value">${val || '-'}</div></div>`).join('')}
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Çakra Yorumları</h2>
            ${chakraTitles.map((title, i) => chakras[i] ? `
              <div class="text-block">
                <strong style="color: #1D3557; display: block; margin-bottom: 8px;">${title}</strong>
                ${chakras[i]}
              </div>
            ` : '').join('') || '<p style="color: #64748B; font-style: italic; margin-top: 15px;">Çakra yorumu girilmedi.</p>'}
          </div>

          ${(bereketKodu || zenginIsik) ? `
          <div class="codes">
            <h3 style="color: #1D3557; margin-top: 0;">Özel Numeroloji Kodları</h3>
            ${bereketKodu ? `<p style="font-size: 18px; margin: 10px 0;">Bereket Kodu: <strong>${bereketKodu}</strong></p>` : ''}
            ${zenginIsik ? `<p style="font-size: 18px; margin: 10px 0;">Zengin/Işık Numaran: <strong>${zenginIsik}</strong></p>` : ''}
          </div>
          ` : ''}

          <div class="footer">
            Bu rapor Numerio - Profesyonel Analiz Sistemi tarafından oluşturulmuştur.
          </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      // Share functionality
      if (Platform.OS === 'web') {
        // On Web, expo-sharing might not work natively in all browsers, provide a prompt
        Alert.alert("Başarılı", "PDF oluşturuldu. Web önizlemesinde indirme desteklenmiyor olabilir, lütfen mobilde veya simülatörde test edin.");
      } else {
        await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      }
    } catch (error) {
      Alert.alert("Hata", "PDF oluşturulurken bir sorun oluştu.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>{id === 'new' ? 'Yeni Numerio Analizi' : 'Analizi Düzenle'}</Text>

      {/* Kişisel Bilgiler Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
        
        <Text style={styles.label}>Ad ve Soyad</Text>
        <TextInput style={styles.input} placeholder="Örn: Ayşe Yılmaz" value={name} onChangeText={setName} />

        <Text style={styles.label}>Doğum Tarihi (Sadece rakam yazın)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Örn: 20032006" 
          value={dob}
          onChangeText={handleDobChange}
          keyboardType="numeric"
          maxLength={10}
        />

        <TouchableOpacity style={styles.calcButton} onPress={handleAutoCalculate}>
          <Text style={styles.calcButtonText}>✨ Pin Kodunu Otomatik Hesapla</Text>
        </TouchableOpacity>
      </View>

      {/* Pin Kodu Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pin Kodu Haneleri</Text>
        <View style={styles.pinGrid}>
          {pinCode.map((val, index) => (
            <View key={index} style={styles.pinBox}>
              <Text style={styles.pinBoxLabel}>{index + 1}. Hane</Text>
              <TextInput 
                style={styles.pinInput} value={val} keyboardType="numeric"
                onChangeText={(text) => {
                  const newPin = [...pinCode];
                  newPin[index] = text;
                  setPinCode(newPin);
                }}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Çakralar Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Çakra Yorumları</Text>
        <Text style={styles.infoText}>Aşağıdaki alanlara çakraların durumunu (açık/kapalı/eksik) girebilirsiniz.</Text>
        
        {chakraTitles.map((title, index) => (
          <View key={index} style={styles.chakraContainer}>
            <Text style={styles.chakraLabel}>{title}</Text>
            <TextInput 
              style={styles.textArea} placeholder={`${index + 1}. çakra yorumları...`}
              multiline={true} numberOfLines={3} value={chakras[index.toString()] || ''}
              onChangeText={(text) => setChakras({...chakras, [index.toString()]: text})}
            />
          </View>
        ))}
      </View>

      {/* Ekstra Kodlar Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Özel Kodlar</Text>
        
        <Text style={styles.label}>Bereket Kodu</Text>
        <TextInput style={styles.input} placeholder="Bereket Kodu..." value={bereketKodu} onChangeText={setBereketKodu} />

        <Text style={styles.label}>Zengin / Işık Numaran</Text>
        <TextInput style={styles.input} placeholder="Numaranız..." value={zenginIsik} onChangeText={setZenginIsik} />
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Kaydet ve Çık</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.pdfButton} onPress={generatePDF}>
          <Text style={styles.pdfButtonText}>📄 PDF Oluştur ve Paylaş</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  content: { padding: 16, paddingBottom: 40 },
  header: { fontSize: 24, fontWeight: 'bold', color: Colors.light.primary, marginBottom: 20, textAlign: 'center' },
  section: { backgroundColor: Colors.light.card, padding: 16, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: Colors.light.primary, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: Colors.light.border, paddingBottom: 8 },
  label: { fontSize: 14, color: Colors.light.text, marginBottom: 6, fontWeight: '500' },
  input: { backgroundColor: Colors.light.inputBackground, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16 },
  calcButton: { backgroundColor: Colors.light.secondary, padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  calcButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  pinGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  pinBox: { width: '30%', marginBottom: 16, alignItems: 'center' },
  pinBoxLabel: { fontSize: 12, color: Colors.light.secondary, marginBottom: 4, fontWeight: 'bold' },
  pinInput: { backgroundColor: Colors.light.inputBackground, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 8, width: '100%', textAlign: 'center', fontSize: 18, padding: 10, fontWeight: 'bold', color: Colors.light.primary },
  infoText: { fontSize: 13, color: Colors.light.secondary, marginBottom: 16, fontStyle: 'italic' },
  chakraContainer: { marginBottom: 16 },
  chakraLabel: { fontSize: 14, fontWeight: 'bold', color: Colors.light.primary, marginBottom: 6 },
  textArea: { backgroundColor: Colors.light.inputBackground, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 8, padding: 12, fontSize: 15, height: 80, textAlignVertical: 'top' },
  saveButton: { backgroundColor: Colors.light.primary, padding: 16, borderRadius: 8, alignItems: 'center', flex: 1, marginRight: 8 },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  pdfButton: { backgroundColor: Colors.light.secondary, padding: 16, borderRadius: 8, alignItems: 'center', flex: 1, marginLeft: 8 },
  pdfButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
