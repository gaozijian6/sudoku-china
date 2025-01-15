import mobileAds, {
  MaxAdContentRating,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

class RewardedVideo {
  private static instance: RewardedVideo;
  private isLoaded: boolean = false;
  private rewardedAd: RewardedAd;
  private adUnitId: string = TestIds.REWARDED; // 替换为你的广告ID
  private startLoadTime: number = 0;
  private constructor() {
    this.initAds();
    this.rewardedAd = RewardedAd.createForAdRequest(this.adUnitId);
    this.initListeners();
    this.load();
  }

  public static getInstance(): RewardedVideo {
    if (!RewardedVideo.instance) {
      RewardedVideo.instance = new RewardedVideo();
    }
    return RewardedVideo.instance;
  }

  private initListeners(): void {
    this.rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      // console.log('RewardedVideo loaded');
      this.isLoaded = true;
      this.startLoadTime = Date.now();
    });
    this.rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        this.isLoaded = false;
        setTimeout(() => {
          this.load();
        }, 0);
      },
    );
  }

  public async load(): Promise<void> {
    if (!this.isLoaded) {
      // console.log('RewardedVideo load');
      try {
        await this.rewardedAd.load();
      } catch (err) {
        console.log('加载激励视频失败:', err);
      }
    }
  }

  public async show(): Promise<void> {
    if (this.isLoaded) {
      await this.rewardedAd.show();
    }
  }

  public isReady(): boolean {
    if (this.isLoaded && Date.now() - this.startLoadTime > 50 * 60 * 1000) {
      this.isLoaded = false;
    }
    return this.isLoaded;
  }

  public async initAds(): Promise<void> {
    try {
      await mobileAds().initialize();
    } catch (error) {
      console.error('初始化广告失败:', error);
    }
  }
}

const rewardedVideo = RewardedVideo.getInstance();

export default rewardedVideo;
