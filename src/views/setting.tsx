import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Pressable,
  Image,
  Animated,
  StatusBar,
} from 'react-native';

interface SettingProps {
  slideAnim: Animated.Value;
  closeSetting: () => void;
  toogleSound: () => void;
  isSound: boolean;
}

const Setting: React.FC<SettingProps> = ({
  slideAnim,
  closeSetting,
  toogleSound,
  isSound,
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateX: slideAnim,
            },
          ],
        },
      ]}>
      <View style={styles.tarbar}>
        <Pressable onPressIn={closeSetting} style={styles.backIconContainer}>
          <Image
            source={require('../assets/icon/back.png')}
            style={styles.backIcon}
          />
        </Pressable>
        <Text style={styles.tarbarText}>设置</Text>
      </View>

      <View style={styles.content}>
        <Pressable style={[styles.item, {backgroundColor: 'rgb(251,245,223)'}]}>
          <Image
            source={require('../assets/icon/closeAD.png')}
            style={styles.leftIcon}
          />
          <Text style={styles.itemText}>移除广告</Text>
          <Image
            source={require('../assets/icon/arrow.png')}
            style={styles.arrow}
          />
        </Pressable>

        <View style={styles.item}>
          <Image
            source={require('../assets/icon/sound.png')}
            style={styles.leftIcon}
          />
          <Text style={styles.itemText}>音效</Text>
          <Switch
            value={isSound}
            onValueChange={toogleSound}
            trackColor={{false: '#f0f0f0', true: 'rgb(91,139,241)'}}
            thumbColor={isSound ? '#fff' : '#fff'}
          />
        </View>

        <Pressable style={styles.item}>
          <Image
            source={require('../assets/icon/email.png')}
            style={styles.leftIcon}
          />
          <Text style={styles.itemText}>意见反馈</Text>
          <Image
            source={require('../assets/icon/arrow.png')}
            style={styles.arrow}
          />
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton}>
        <Text style={styles.logoutText}>退出登录</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
    top: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
  tarbar: {
    backgroundColor: 'rgb(91,139,241)',
    height: 50,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tarbarText: {
    fontSize: 20,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    marginTop: 60,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'rgb(243,247,250)',
  },
  itemText: {
    fontSize: 20,
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  arrow: {
    width: 20,
    height: 20,
  },
  headerLogo: {
    position: 'absolute',
    right: 15,
    top: 12,
    width: 25,
    height: 25,
  },
  backIconContainer: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 10,
    zIndex: 10,
  },
  backIcon: {
    height: 20,
    width: 20,
  },
  logoutButton: {
    marginHorizontal: 15,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: 'rgb(243,247,250)',
  },
  logoutText: {
    fontSize: 20,
    color: '#ff4d4f',
  },
  leftIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

export default Setting;
