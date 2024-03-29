export interface Option {
  id: string;
  label: string;
}

export interface HomeSection {
  bannerProportion?: any;
  coverType?: any;
  homeSectionId: number;
  homeSectionName: string;
  homeSectionType: string;
  recommendContentVOList: RecommendContentVOList[];
  refId?: any;
  refRedirectUrl: string;
}

export interface RecommendContentVOList {
  contentType: string;
  id: number;
  imageUrl: string;
  jumpAddress: string;
  jumpType: string;
  needLogin: boolean;
  resourceNum?: any;
  resourceStatus?: any;
  showMark: boolean;
  title: string;
  category: number;
}
export interface TopSearched {
  cover: string;
  domainType: number;
  id: string;
  title: string;
}

export interface DetailType {
  aliasName: string;
  areaList: { id: number; name: string }[];
  areaNameList: string[];
  category: number;
  collect: boolean;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo: {
    drameName: string;
    drameType: string;
  };
  episodeCount?: any;
  episodeVo: {
    definitionList: {
      code: string;
      description: string;
      fullDescription: string;
    }[];
    id: number;
    name: string;
    resourceType: number;
    seriesNo: number;
    subtitlingList: {
      language: string;
      languageAbbr: string;
      subtitlingUrl: string;
      translateType: number;
    }[];
    vid: string;
  }[];
  id: string;
  introduction: string;
  likeList: {
    areaList: {
      id: number;
      name: string;
    }[];
    areaNameList: string[];
    category: number;
    coverHorizontalUrl: string;
    coverVerticalUrl: string;
    drameTypeVo?: any;
    id: string;
    name: string;
    score: number;
    tagList: {
      id: number;
      name: string;
    }[];
    tagNameList: string[];
    upImgUrl: string;
    upName: string;
    year: number;
  }[];
  name: string;
  refList: {
    category: number;
    coverHorizontalUrl: string;
    coverVerticalUrl: string;
    drameTypeVo?: any;
    id: string;
    name: string;
    seriesNo: number;
  }[];
  reserved: boolean;
  score: number;
  seriesNo: number;
  showSetName: boolean;
  tagList: {
    id: number;
    name: string;
  }[];
  tagNameList: string[];
  translateType: number;
  upInfo: {
    upId: number;
    upImgUrl: string;
    upName: string;
  };
  updateInfo?: any;
  year: number;
}

export interface SearchResultItem {
  areas: {
    id: number;
    name: string;
  }[];
  categoryTag: {
    id: number;
    name: string;
  }[];
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  domainType: number;
  dramaType: {
    code: string;
    name: string;
  };
  duration: string;
  id: string;
  name: string;
  releaseTime: string;
  sort: string;
  upInfo: {
    enable: boolean;
    upId: number;
    upImgUrl: string;
    upName: string;
  };
}

export interface SearchConfig {
  id: number;
  name: string;
  params: string;
  screeningItems: {
    id?: number;
    items: {
      name: string;
      params: string;
      screeningType: string;
    }[];
    name: string;
  }[];
}

export interface User {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
}

export interface CommentType {
  user: User;
  value: string;
  reactions: {
    [key: string]: number;
  };
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
}

export interface DiscoveryItem {
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  duration: number;
  id: string;
  introduction: string;
  like: boolean;
  likeCount: number;
  mediaInfo: {
    definitionList: {
      code: string;
      description: string;
      fullDescription: string;
    }[];
    id: number;
    resourceType: number;
    subtitlingList: any[];
  };
  name: string;
  refList: {
    category: number;
    coverHorizontalUrl: string;
    coverVerticalUrl: string;
    drameTypeVo: {
      drameName: string;
      drameType: string;
    };
    id: string;
    name: string;
    score: number;
    tagList: {
      id: number;
      name: string;
    }[];
    year: number;
  }[];
  upInfo: {
    enable: boolean;
    upId: number;
    upImgUrl: string;
    upName: string;
  };

  mediaUrl: string;
}

export interface AdvanceSearchItem {
  coverVerticalUrl: string;
  domainType: number;
  id: string;
  name: string;
  sort: string;
}

export interface Movie {
  aliasName: string;
  areaList: AreaList[];
  areaNameList: string[];
  category: number;
  collect: boolean;
  contentTagResourceList: any[];
  coverHorizontalUrl: string;
  coverHorizontalUrlJson: string;
  coverVerticalUrl: string;
  drameTypeVo: DrameTypeVo;
  episodeCount: number;
  episodeRoomListVo: EpisodeRoomListVo;
  episodeVo: EpisodeVo[];
  id: string;
  introduction: string;
  likeList: LikeList[];
  name: string;
  nameJson: string;
  refList: any[];
  reserved: boolean;
  score: number;
  seriesNo: any;
  showSetName: boolean;
  starList: any[];
  tagList: TagList2[];
  tagNameList: string[];
  translateType: number;
  upInfo: UpInfo;
  updateInfo: UpdateInfo;
  year: number;
}

export interface AreaList {
  id: number;
  name: string;
}

export interface DrameTypeVo {
  drameName: string;
  drameType: string;
}

export interface EpisodeRoomListVo {
  category: number;
  episodeId: string;
  episodeName: string;
  number: number;
  roomId: string;
  seasonID: string;
  seasonName: string;
}

export interface EpisodeVo {
  definitionList: DefinitionList[];
  id: number;
  name: string;
  nameJson: string;
  resourceType: number;
  seriesNo: number;
  subtitlingList: any[];
  totalTime: number;
  vid: string;
}

export interface DefinitionList {
  code: string;
  description: string;
  fullDescription: string;
}

export interface LikeList {
  areaList: AreaList2[];
  areaNameList: string[];
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo: DrameTypeVo2;
  id: string;
  name: string;
  score: number;
  tagList: TagList[];
  tagNameList: string[];
  upImgUrl: string;
  upName: string;
  year: number;
}

export interface AreaList2 {
  id: number;
  name: string;
}

export interface DrameTypeVo2 {
  drameName: string;
  drameType: string;
}

export interface TagList {
  id: number;
  name: string;
}

export interface TagList2 {
  id: number;
  name: string;
}

export interface UpInfo {
  upId: number;
  upImgUrl: string;
  upName: string;
}

export interface UpdateInfo {
  updatePeriod: string;
  updateStatus: number;
}

export interface Favorite {
  id: string;
  category: number;
  coverHorizontalUrl: string;
  name: string;
  createdAt: number;
}

export interface History extends Favorite {
  totalTime: number;
  currentTime: number;
  episodeId: number;
}

export enum WatchType {
  TV = "tv",
  MOVIE = "movie",
}

export enum TypeResource {
  GROOT_HD = "GROOT_HD",
  GROOT_SD = "GROOT_SD",
  GROOT_LD = "GROOT_LD",
}

export interface ResourceMovie {
  businessType: number;
  currentDefinition: string;
  episodeId: string;
  mediaUrl: string;
  totalDuration: number;
}

export interface SearchResult extends RecommendContentVOList {
  areas: Area[];
  categoryTag: CategoryTag[];
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  domainType: number;
  dramaType: DramaType;
  duration: string;
  name: string;
  releaseTime: string;
  sort: string;
  upInfo: UpInfo;
}

export interface Area {
  id: number;
  name: string;
}

export interface CategoryTag {
  id: number;
  name: string;
}

export interface DramaType {
  code: string;
  name: string;
}

export interface UpInfo {
  enable: boolean;
  upId: number;
  upImgUrl: string;
  upName: string;
  userId: any;
}
