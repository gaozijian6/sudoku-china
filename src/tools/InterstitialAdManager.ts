import mobileAds, { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

class InterstitialAdManager {
  private static instance: InterstitialAdManager;
  public interstitialAd: InterstitialAd;
  private loaded: boolean = false;
  private isLoading: boolean = false;
  private timer: NodeJS.Timeout | null = null;
  private isVip: boolean = false;
  private lastShowTime: number = Date.now();
  private hasFirstShow: boolean = false;
  private adUnitId: string = __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-2981436674907454/4258278971';

  private constructor() {
    this.initAds();
    this.interstitialAd = InterstitialAd.createForAdRequest(this.adUnitId);
    this.setupAdListeners();
  }

  public static getInstance(): InterstitialAdManager {
    if (!InterstitialAdManager.instance) {
      InterstitialAdManager.instance = new InterstitialAdManager();
    }
    return InterstitialAdManager.instance;
  }

  private setupAdListeners() {
    this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      this.isLoading = false;
      this.loaded = true;
      console.log('插页式广告加载成功');
    });

    this.interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      this.loaded = false;
      this.loadAd();
      console.log('插页式广告关闭');
    });

    this.interstitialAd.addAdEventListener(AdEventType.ERROR, error => {
      this.isLoading = false;
      this.loaded = false;
      console.log('插页式广告加载失败', error);
    });
  }

  public setIsVip(isVip: boolean) {
    this.isVip = isVip;
  }

  public loopLoad() {
    this.timer = setInterval(() => {
      this.loadAd();
    }, 30000);
  }

  public clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async loadAd() {
    if (this.isVip || this.isLoading) {
      return;
    }
    if (!this.loaded) {
      console.log('插页式广告加载中');
      this.isLoading = true;
      await this.interstitialAd.load();
    }
  }

  public async showAd() {
    if (this.isAvaliableShow()) {
      await this.interstitialAd.show();
      this.lastShowTime = Date.now();
      this.hasFirstShow = true;
    }
  }

  public isLoaded(): boolean {
    return this.loaded;
  }

  public isAvaliableShow(): boolean {
    const currentTime = Date.now();
    if (this.isVip) return false;
    // 后续展示间隔
    if (currentTime - this.lastShowTime >= 300000 && this.isLoaded() && this.hasFirstShow) {
      return true;
    }
    // 首次展示间隔
    if (currentTime - this.lastShowTime >= 180000 && this.isLoaded() && !this.hasFirstShow) {
      return true;
    }
    return false;
  }

  private async initAds(): Promise<void> {
    await mobileAds().initialize();
  }
}

const interstitialAdManager = InterstitialAdManager.getInstance();

export default interstitialAdManager;
