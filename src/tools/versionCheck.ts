import DeviceInfo from 'react-native-device-info';
import axios from 'axios';

interface VersionInfo {
  needsUpdate: boolean;
  latestVersion: string;
  currentVersion: string;
  appStoreUrl: string;
}

// App Store URL - 从设置页面复制过来的
const APP_STORE_URL = 'https://apps.apple.com/cn/app/id6741408233';

// iTunes Lookup API
const ITUNES_LOOKUP_URL = 'https://itunes.apple.com/lookup?bundleId=org.zijian.SudokuAppChina&country=cn';

// 或者也可以尝试直接使用App ID（如果知道的话）
// const ITUNES_LOOKUP_URL = 'https://itunes.apple.com/lookup?id=6741408233&country=cn';

export const checkAppVersion = async (): Promise<VersionInfo | null> => {
  try {
    // 获取当前版本
    const currentVersion = DeviceInfo.getVersion();

    // 使用axios从App Store获取最新版本信息
    const response = await axios.get(ITUNES_LOOKUP_URL, {
      timeout: 10000, // 10秒超时
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.data && response.data.results && response.data.results.length > 0) {
      const appInfo = response.data.results[0];
      const latestVersion = appInfo.version;
      console.log('latestVersion', latestVersion);
      console.log('currentVersion', currentVersion);

      // 比较版本号
      const needsUpdate = compareVersions(currentVersion, latestVersion) < 0;

      return {
        needsUpdate,
        latestVersion,
        currentVersion,
        appStoreUrl: APP_STORE_URL,
      };
    }

    return null;
  } catch (error) {
    console.log('版本检查失败:', error);

    // 如果是网络错误或超时，可以静默处理
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        console.log('版本检查请求超时');
      } else if (error.response) {
        console.log('版本检查服务器响应错误:', error.response.status);
      } else if (error.request) {
        console.log('版本检查网络请求失败');
      }
    }

    return null;
  }
};

// 比较版本号（返回 -1, 0, 1）
const compareVersions = (version1: string, version2: string): number => {
  const v1parts = version1.split('.').map(Number);
  const v2parts = version2.split('.').map(Number);

  const maxLength = Math.max(v1parts.length, v2parts.length);

  for (let i = 0; i < maxLength; i++) {
    const v1 = v1parts[i] || 0;
    const v2 = v2parts[i] || 0;

    if (v1 < v2) return -1;
    if (v1 > v2) return 1;
  }

  return 0;
};
