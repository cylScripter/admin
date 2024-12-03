interface BasicOption {
  label: string;
  value: string;
}

type SelectOption = BasicOption;

type TabOption = BasicOption;

interface BasicUserInfo {
  /**
   * 头像
   */
  avatar: string;
  /**
   * 用户邮箱
   */
  email: string;
  /**
   * 用户id
   */
  id: number;
  /**
   *  用户手机号
   */
  mobile: string;
  /**
   * 用户昵称
   */
  nickname: string;
  /**
   * 用户角色
   */
  roles?: string[];
}

interface AccessState {
  /**
   * 用户信息
   */
  userInfo: BasicUserInfo | null;
  /**
   * 用户角色
   */
  userRoles: string[];
}

type ClassType = Array<object | string> | object | string;

export type { BasicOption, BasicUserInfo, ClassType, SelectOption, TabOption };
