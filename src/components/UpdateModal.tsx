import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Linking, ScrollView, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSudokuStore } from '../store';
import DeviceInfo from 'react-native-device-info';

interface UpdateModalProps {
  visible: boolean;
  onClose: () => void;
  currentVersion?: string;
  newVersion?: string;
  appStoreUrl: string;
  releaseNotes?: string;
  releaseDate?: string;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  visible,
  onClose,
  currentVersion,
  newVersion,
  appStoreUrl,
  releaseNotes,
  releaseDate,
}) => {
  const { t, i18n } = useTranslation();
  const isDark = useSudokuStore(state => state.isDark);
  const isPortrait = useSudokuStore(state => state.isPortrait);
  const styles = createStyles(isDark, isPortrait);

  const handleUpdate = () => {
    Linking.openURL(appStoreUrl);
    onClose();
  };

  const handleLater = () => {
    onClose();
  };

  const formatReleaseDate = (dateString?: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const isChinese = i18n.language.includes('zh');

    return date.toLocaleDateString(isChinese ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: isChinese ? 'long' : 'short',
      day: 'numeric',
    });
  };

  const formatReleaseNotes = (notes?: string) => {
    if (!notes) return [];

    return notes
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.trim());
  };

  const noteLines = formatReleaseNotes(releaseNotes);

  return (
    <Modal 
      visible={visible} 
      transparent 
      animationType="fade" 
      onRequestClose={onClose}
      supportedOrientations={['portrait', 'landscape']}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('updateAvailable')}</Text>

          <View style={styles.versionContainer}>
            <View style={styles.versionCompareContainer}>
              <View style={styles.currentVersionContainer}>
                <Text style={styles.versionLabel}>{t('currentVersion')}</Text>
                <Text style={styles.currentVersionText}>{currentVersion}</Text>
              </View>

              <View style={styles.arrowContainer}>
                <Text style={styles.arrow}>→</Text>
              </View>

              <View style={styles.newVersionContainer}>
                <Text style={styles.versionLabel}>{t('newVersion')}</Text>
                <Text style={styles.newVersionText}>{newVersion}</Text>
              </View>
            </View>

            {releaseDate && <Text style={styles.dateText}>{formatReleaseDate(releaseDate)}</Text>}
          </View>

          {noteLines.length > 0 && (
            <ScrollView style={styles.notesContainer} showsVerticalScrollIndicator={false}>
              <Text style={styles.notesTitle}>{t('updateNotes')}:</Text>
              {noteLines.map((line, index) => (
                <Text key={index} style={styles.noteItem}>
                  • {line}
                </Text>
              ))}
            </ScrollView>
          )}

          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.laterButton]} onPress={handleLater}>
              <Text style={styles.laterButtonText}>{t('later')}</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
              <Text style={styles.updateButtonText}>{t('updateNow')}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (isDark: boolean, isPortrait: boolean) => {
  const model = DeviceInfo.getModel();
  const isIpad = model.includes('iPad');
  
  // 动态计算弹窗宽度，iPad横屏时使用较小的宽度
  const getModalWidth = () => {
    if (isIpad && !isPortrait) {
      return '60%'; // iPad横屏时使用60%宽度
    }
    return '85%'; // 其他情况保持原来的85%
  };

  const getMaxWidth = () => {
    if (isIpad && !isPortrait) {
      return 500; // iPad横屏时允许更大的最大宽度
    }
    return 400; // 其他情况保持原来的400
  };

  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: isDark ? 'rgb(32, 31, 33)' : '#fff',
      borderRadius: 12,
      padding: 24,
      width: getModalWidth(),
      maxWidth: getMaxWidth(),
      maxHeight: '80%',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#888' : '#333',
      marginBottom: 20,
      textAlign: 'center',
    },
    versionContainer: {
      alignItems: 'center',
      marginBottom: 16,
      width: '100%',
    },
    versionCompareContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 8,
    },
    currentVersionContainer: {
      flex: 1,
      alignItems: 'center',
    },
    newVersionContainer: {
      flex: 1,
      alignItems: 'center',
    },
    arrowContainer: {
      paddingHorizontal: 16,
    },
    arrow: {
      fontSize: 20,
      color: isDark ? '#666' : '#999',
    },
    versionLabel: {
      fontSize: 12,
      color: isDark ? '#777' : '#777',
      marginBottom: 4,
    },
    currentVersionText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#999' : '#666',
    },
    newVersionText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? 'rgb(47, 82, 158)' : 'rgb(91,139,241)',
    },
    dateText: {
      fontSize: 14,
      color: isDark ? '#777' : '#777',
      marginTop: 8,
    },
    notesContainer: {
      maxHeight: 200,
      width: '100%',
      marginBottom: 20,
    },
    notesTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#888' : '#333',
      marginBottom: 12,
    },
    noteItem: {
      fontSize: 14,
      color: isDark ? '#666' : '#666',
      lineHeight: 20,
      marginBottom: 6,
      paddingLeft: 8,
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    laterButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: isDark ? '#666' : '#ddd',
      marginRight: 8,
    },
    updateButton: {
      backgroundColor: isDark ? 'rgb(47, 82, 158)' : 'rgb(91,139,241)',
      marginLeft: 8,
    },
    laterButtonText: {
      color: isDark ? '#888' : '#666',
      fontSize: 16,
      fontWeight: '500',
    },
    updateButtonText: {
      color: isDark ? '#999' : '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
};

export default UpdateModal;
