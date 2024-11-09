import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

interface ResultProps {
  time: string;
  errorCount: number;
  hintCount: number;
  onNext: () => void;
}

const ResultView: React.FC<ResultProps> = ({time, errorCount, hintCount, onNext}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>恭喜过关</Text>
        <View style={styles.content}>
          <Text style={styles.text}>用时: {time}</Text>
          <Text style={styles.text}>错误次数：{errorCount}</Text>
          <Text style={styles.text}>提示次数：{hintCount}</Text>
        </View>
        <Pressable style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>下一关</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  content: {
    width: '100%',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#1890ff',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ResultView;
