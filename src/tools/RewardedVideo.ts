import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

class RewardedVideo {
  private static instance: RewardedVideo;
  private isLoaded: boolean = false;
  private rewardedAd: RewardedAd;
  private adUnitId: string = TestIds.REWARDED; // 替换为你的广告ID
  private callback?: (value: boolean) => void;
  private constructor() {
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
      this.callback?.(true);
    });
    this.rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        this.isLoaded = false;
      },
    );
  }

  public async load(): Promise<void> {
    if (!this.isLoaded) {
      await this.rewardedAd.load();
    }
  }

  public async show(): Promise<void> {
    if (this.isLoaded) {
      await this.rewardedAd.show();
      this.load();
    }
  }

  public setCallback(callback: (value: boolean) => void): void {
    this.callback = callback;
  }

  public isReady(): boolean {
    return this.isLoaded;
  }
}

const rewardedVideo = RewardedVideo.getInstance();

export default rewardedVideo;
