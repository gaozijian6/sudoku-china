import mobileAds, {
  MaxAdContentRating,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  AdEventType
} from 'react-native-google-mobile-ads';

class RewardedVideo {
  private static instance: RewardedVideo;
  private isLoaded: boolean = false;
  private rewardedAd: RewardedAd;
  // private adUnitId: string = 'ca-app-pub-2981436674907454/8073755152'; // 实际广告ID
  private adUnitId: string = TestIds.REWARDED; // 测试广告ID
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
      this.isLoaded = true;
      this.startLoadTime = Date.now();
      console.log('广告加载成功');
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
    this.rewardedAd.addAdEventListener(AdEventType.OPENED, () => {
      this.isLoaded = false;
      setTimeout(() => {
        this.load();
      }, 0);
    });
    this.rewardedAd.addAdEventListener(AdEventType.ERROR, () => {
      console.log('广告加载失败');
    });
  }

  public async load(): Promise<void> {
    if (!this.isLoaded) {
      console.log('广告加载中', this.isLoaded);
      await this.rewardedAd.load();
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
    // await mobileAds().setRequestConfiguration({
    //   // 设置面向儿童的广告
    //   tagForChildDirectedTreatment: true,
    //   // 设置最大广告内容分级为 G
    //   maxAdContentRating: MaxAdContentRating.G,
    // });
    await mobileAds().initialize();
  }
}

const rewardedVideo = RewardedVideo.getInstance();

export default rewardedVideo;
