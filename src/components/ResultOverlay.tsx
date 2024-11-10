import React, { useEffect } from 'react';
import {View, Text, Pressable, StyleSheet, Animated} from 'react-native';

interface ResultProps {
  time: string;
  errorCount: number;
  hintCount: number;
  onNext: () => void;
}

const ResultView: React.FC<ResultProps> = ({time, errorCount, hintCount, onNext}) => {
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 40
    }).start();
  }, []);

  return (
    <View style={styles.overlay}>
      <Animated.View style={[
        styles.container,
        {
          transform: [{
            scale: scaleAnim
          }]
        }
      ]}>
        <Text style={styles.title}>恭喜过关</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.leftText}>用时：</Text>
            <Text style={styles.rightText}>{time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>错误次数：</Text>
            <Text style={styles.rightText}>{errorCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>提示次数：</Text>
            <Text style={styles.rightText}>{hintCount}</Text>
          </View>
        </View>
        <Pressable style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>下一关</Text>
        </Pressable>
      </Animated.View>
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
    zIndex: 1000,
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
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 12,
  },
  leftText: {
    fontSize: 16,
    color: '#666',
    width: 100,  // 固定左侧文字宽度
    textAlign: 'right',
    paddingRight: 8,
  },
  rightText: {
    fontSize: 16,
    color: '#666',
    width: 100,  // 固定右侧文字宽度
    textAlign: 'left',
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
