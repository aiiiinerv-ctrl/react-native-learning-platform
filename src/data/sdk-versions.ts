export interface SdkRelease {
  version: string;
  releaseDate: string;
  highlights: string[];
  breakingChanges: string[];
}

export const sdkReleases: SdkRelease[] = [
  {
    version: '0.76',
    releaseDate: '2024-10-23',
    highlights: [
      'New Architecture enabled by default',
      'React 18.3 support',
      'Improved Hermes performance',
      'New boxShadow style prop',
    ],
    breakingChanges: [
      'NativeModules replaced by TurboModules',
      'TouchableOpacity deprecated for Pressable',
    ],
  },
  {
    version: '0.75',
    releaseDate: '2024-08-13',
    highlights: [
      'Expo SDK 51 support',
      'Yoga 3.1 layout engine',
      'Percentage support in various styles',
      'Auto-linking improvements',
    ],
    breakingChanges: [
      'Minimum iOS deployment target raised to 15.1',
      'Android minSdkVersion raised to 24',
    ],
  },
  {
    version: '0.74',
    releaseDate: '2024-04-22',
    highlights: [
      'New Yoga 3.0 layout engine',
      'Bridgeless mode as default for new architecture',
      'yarn 3 support',
    ],
    breakingChanges: [
      'Removed PropTypes from core',
      'Java 17 required for Android',
    ],
  },
  {
    version: '0.73',
    releaseDate: '2023-12-06',
    highlights: [
      'Debugging improvements',
      'Kotlin template for Android',
      'Stable symlink support',
    ],
    breakingChanges: [
      'Deprecated <=Android 6.0 support',
      'Java interop updates required',
    ],
  },
];

export const latestSdkVersion = sdkReleases[0].version;
