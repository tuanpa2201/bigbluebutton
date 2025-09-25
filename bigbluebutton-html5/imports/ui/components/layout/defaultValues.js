import { LAYOUT_TYPE, CAMERADOCK_POSITION, PANELS } from './enums';

const getSidebarSizes = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width >= 1025 && width <= 1366) {
      return { sidebarContentMaxWidth: 320, sidebarContentMinWidth: 320 };
    }
  }
  return { sidebarContentMaxWidth: 612, sidebarContentMinWidth: 360 };
};

const { sidebarContentMaxWidth, sidebarContentMinWidth } = getSidebarSizes();

const DEFAULT_VALUES = {
  layoutType: LAYOUT_TYPE.CUSTOM_LAYOUT,
  panelType: PANELS.USERLIST,
  fontSize: 16,

  cameraPosition: CAMERADOCK_POSITION.CONTENT_TOP,
  cameraDockTabOrder: 4,
  cameraDockMinHeight: 120,
  cameraDockMinWidth: 120,
  camerasMargin: 10,
  captionsMargin: 10,

  presentationTabOrder: 5,
  presentationMinHeight: 220,
  presentationToolbarMinWidth: 430,

  bannerHeight: 34,

  navBarHeight: 94,
  navBarTop: 0,
  navBarTabOrder: 3,

  actionBarHeight: 56,
  actionBarPadding: 20,
  actionBarTabOrder: 6,

  sidebarNavMaxWidth: 70,
  sidebarNavMinWidth: 70,
  sidebarNavHeight: '100%',
  sidebarNavTop: 0,
  sidebarNavLeft: 0,
  sidebarNavTabOrder: 1,
  sidebarNavPanel: PANELS.USERLIST,

  sidebarContentMaxWidth,
  sidebarContentMinWidth,
  sidebarContentMinHeight: 200,
  sidebarContentHeight: '100%',
  sidebarContentTop: 0,
  sidebarContentTabOrder: 2,
  sidebarContentPanel: PANELS.NONE,
};

export default DEFAULT_VALUES;
export {
  LAYOUT_TYPE,
  CAMERADOCK_POSITION,
};
