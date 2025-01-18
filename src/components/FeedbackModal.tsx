import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  Linking,
  Keyboard,
  Clipboard,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({visible, onClose}) => {
  const [feedback, setFeedback] = useState('');
  const [subject, setSubject] = useState('');
  const emailAddress = 'gaozijian32@gmail.com';

  const handleSubmit = async () => {
    if (!subject.trim()) {
      Alert.alert('提示', '请输入反馈标题');
      return;
    }
    if (!feedback.trim()) {
      Alert.alert('提示', '请输入反馈内容');
      return;
    }

    Alert.alert(
      '提交反馈',
      `请通过以下方式发送反馈：\n\n邮箱：${emailAddress}\n\n我们会尽快回复您！`,
      [
        {
          text: '复制邮箱',
          onPress: () => {
            Clipboard.setString(emailAddress);
            Alert.alert('提示', '邮箱地址已复制到剪贴板');
          },
        },
        {
          text: '关闭',
          onPress: () => {
            onClose();
            setSubject('');
            setFeedback('');
          },
        },
      ],
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable 
        style={styles.modalContainer} 
        onPress={Keyboard.dismiss}
      >
        <Pressable 
          style={styles.modalContent}
          onPress={e => e.stopPropagation()}
        >
          <Text style={styles.title}>意见反馈</Text>
          
          <TextInput
            style={styles.titleInput}
            placeholder="请输入反馈标题..."
            value={subject}
            onChangeText={setSubject}
          />

          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            placeholder="请输入您的反馈意见..."
            value={feedback}
            onChangeText={setFeedback}
          />

          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>取消</Text>
            </Pressable>
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>提交</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    position: 'relative',
    top: -100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: '#666',
  },
  submitButton: {
    flex: 1,
    backgroundColor: 'rgb(91,139,241)',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default FeedbackModal; 