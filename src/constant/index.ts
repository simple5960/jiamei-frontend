import Taro from "@tarojs/taro";

export const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB;
