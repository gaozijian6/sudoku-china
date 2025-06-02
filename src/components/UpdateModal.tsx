import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Linking, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSudokuStore } from '../store';

interface UpdateModalProps {
  visible: boolean;
  onClose: () => void;
  newVersion?: string;
  appStoreUrl: string;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ visible, onClose, newVersion, appStoreUrl }) => {
  const { t } = useTranslation();
  const isDark = useSudokuStore(state => state.isDark);
  const styles = createStyles(isDark);

  const handleUpdate = () => {
    Linking.openURL(appStoreUrl);
    onClose();
  };

  const handleLater = () => {
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('updateAvailable')}</Text>

          <Text style={styles.message}>{t('updateMessage', { version: newVersion })}</Text>

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

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
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
      width: '85%',
      maxWidth: 400,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#888' : '#333',
      marginBottom: 12,
      textAlign: 'center',
    },
    message: {
      fontSize: 16,
      color: isDark ? '#666' : '#666',
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: 24,
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

export default UpdateModal;
