
interface Meta {
    title: string;
    order: number;
    icon: string;
    badge: string;
    active_icon: string;
    iframe_src: string;
    affixTab: boolean;
    activePath: string;
    badgeVariants: string;
    badgeType: string;
    badgeText: string;
    hideChildrenInMenu: boolean;
    hideInTab: boolean;
    hideInMenu: boolean;
    keepAlive: boolean;
    activeIcon: string;
    hideInBreadcrumb: boolean;
    ignoreAccess: boolean;
    link: string;
    openInNewWindow: boolean;
    maxNumOfOpenTab: number;
  }
  
  interface RowType {
    id: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    component: string;
    meta: Meta;
    name: string;
    path: string;
    redirect: string;
    parent_id: number;
    children: RowType[];
  }

  
  export type {
    Meta,
    RowType
  }