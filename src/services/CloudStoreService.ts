import * as iCloudStore from 'react-native-cloud-store';
// 创建一个 CloudStore 服务类
export class CloudStoreService {
  // 保存数据到 iCloud
  static async saveToCloud(key: string, value: any): Promise<void> {
    try {
      await iCloudStore.kvSetItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('保存到 iCloud 失败:', error);
      throw error;
    }
  }

  // 从 iCloud 读取数据
  static async loadFromCloud(key: string): Promise<any> {
    try {
      const data = await iCloudStore.kvGetItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('从 iCloud 读取失败:', error);
      throw error;
    }
  }

  // 从 iCloud 删除数据
  static async removeFromCloud(key: string): Promise<void> {
    try {
      await iCloudStore.kvRemoveItem(key);
    } catch (error) {
      console.error('从 iCloud 删除失败:', error);
      throw error;
    }
  }

  // 监听 iCloud 数据变化
  static watchCloudChanges(key: string, callback: (newValue: any) => void) {
    return iCloudStore.onKVStoreRemoteChanged(event => {
      if (event.value) {
        const parsedValue = JSON.parse(event.value);
        callback(parsedValue);
      }
    });
  }
}
