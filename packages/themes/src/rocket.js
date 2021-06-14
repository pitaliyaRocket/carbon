import {
  blue60,
  blue70,
  red60,
  gray20,
  gray30,
  gray60,
  // Tools
  rgba,
} from '@rocketsoftware/colors';

export const interactive01 = '#025c53';
export const interactive02 = '#333333';
export const interactive03 = '#025c53';
export const interactive04 = '#025c53';

export const uiBackground = '#ffffff';

export const ui01 = '#efefef';
export const ui02 = '#ffffff';
export const ui03 = '#dcdcdc';
export const ui04 = '#bcbcbc';
export const ui05 = '#333333';

export const text01 = '#333333';
export const text02 = '#595959';
export const text03 = '#bcbcbc';
export const text04 = '#ffffff';
export const text05 = gray60;
export const textError = red60;

export const icon01 = '#333333';
export const icon02 = '#595959';
export const icon03 = '#ffffff';

export const link01 = '#025c53';
export const link02 = blue70;

export const inverseLink = blue60;

export const field01 = '#efefef';
export const field02 = '#ffffff';

export const inverse01 = '#ffffff';
export const inverse02 = '#3d3d3d';

export const support01 = '#bf3438';
export const support02 = '#507300';
export const support03 = '#8b6010';
export const support04 = '#01453e';

export const inverseSupport01 = '#fccacc';
export const inverseSupport02 = '#c6ff40';
export const inverseSupport03 = '#fdd13a';
export const inverseSupport04 = '#93c7c2';

export const overlay01 = rgba('#171717', 0.5);

export const danger01 = red60;
export const danger02 = red60;

// Interaction states
export const focus = '#025c53';
export const inverseFocusUi = blue60;

export const hoverPrimary = '#01453e';
export const activePrimary = '#012e29';

export const hoverPrimaryText = '#012e29';

export const hoverSecondary = '#4c4c4c';
export const activeSecondary = '#6f6f6f';

export const hoverTertiary = '#01453e';
export const activeTertiary = '#012e29';

export const hoverUI = '#e5e5e5';
export const activeUI = '#bebebe';
export const activeLightUI = gray30;
export const selectedUI = '#dcdcdc';
export const selectedLightUI = gray20;
export const inverseHoverUI = '#e5e5e5';

export const hoverSelectedUI = '#cacaca';

export const hoverDanger = '#99292d';
export const activeDanger = '#99292d';

export const hoverRow = '#e5e5e5';

export const visitedLink = '#5b2e66';

export const disabled01 = '#f3f3f3';
export const disabled02 = '#bebebe';
export const disabled03 = '#bcbcbc';

export const highlight = '#c9deff';

export const decorative01 = gray20;

export const buttonSeparator = '#e0e0e0';

export const hoverLightUI = '#e5e5e5';

export const skeleton01 = '#e5e5e5';
export const skeleton02 = '#bebebe';

export const brand01 = '#025c53';
export const brand02 = '#333333';
export const brand03 = '#025c53';
export const active01 = '#bebebe';
export const hoverField = '#e5e5e5';

export const danger = danger01;

// New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens
export const background = uiBackground;
export const layer = ui01;
export const layerAccent = ui03;
export const field = field01;
export const backgroundInverse = inverse02;
export const backgroundBrand = interactive01;
export const interactive = interactive04;

export const borderSubtle = ui03;
export const borderStrong = ui04;
export const borderInverse = ui05;
export const borderInteractive = interactive04;

export const textPrimary = text01;
export const textSecondary = text02;
export const textPlaceholder = text03;
export const textHelper = text05;
export const textOnColor = text04;
export const textInverse = inverse01;

export const linkPrimary = link01;
export const linkSecondary = link02;
export const linkVisited = visitedLink;
export const linkInverse = inverseLink;

export const iconPrimary = icon01;
export const iconSecondary = icon02;
export const iconOnColor = icon03;
export const iconInverse = inverse01;

export const supportError = support01;
export const supportSuccess = support02;
export const supportWarning = support03;
export const supportInfo = support04;
export const supportErrorInverse = inverseSupport01;
export const supportSuccessInverse = inverseSupport02;
export const supportWarningInverse = inverseSupport03;
export const supportInfoInverse = inverseSupport04;

export const overlay = overlay01;
export const toggleOff = ui04;

export const buttonPrimary = interactive01;
export const buttonSecondary = interactive02;
export const buttonTertiary = interactive03;
export const buttonDangerPrimary = danger01;
export const buttonDangerSecondary = danger02;

export const backgroundActive = activeUI;
export const layerActive = activeUI;

export const buttonDangerActive = activeDanger;
export const buttonPrimaryActive = activePrimary;
export const buttonSecondaryActive = activeSecondary;
export const buttonTertiaryActive = activeTertiary;

export const focusInset = inverse01;
export const focusInverse = inverseFocusUi;

export const backgroundHover = hoverUI;
export const layerHover = hoverUI;
export const fieldHover = hoverUI;
export const backgroundInverseHover = inverseHoverUI;
export const linkPrimaryHover = hoverPrimaryText;
export const buttonDangerHover = hoverDanger;
export const buttonPrimaryHover = hoverPrimary;
export const buttonSecondaryHover = hoverSecondary;
export const buttonTertiaryHover = hoverTertiary;

export const backgroundSelected = selectedUI;
export const backgroundSelectedHover = hoverSelectedUI;
export const layerSelected = selectedUI;
export const layerSelectedHover = hoverSelectedUI;
export const layerSelectedInverse = ui05;
export const borderSubtleSelected = activeUI;

export const layerDisabled = disabled01;
export const fieldDisabled = disabled01;
export const borderDisabled = disabled01;

export const textDisabled = disabled02;
export const buttonDisabled = disabled02;
export const iconDisabled = disabled02;

export const textOnColorDisabled = disabled03;
export const iconOnColorDisabled = disabled03;
export const layerSelectedDisabled = disabled03;

export const skeletonBackground = skeleton01;
export const skeletonElement = skeleton02;

// Type
export {
  caption01,
  caption02,
  label01,
  label02,
  helperText01,
  helperText02,
  bodyShort01,
  bodyLong01,
  bodyShort02,
  bodyLong02,
  code01,
  code02,
  heading01,
  productiveHeading01,
  heading02,
  productiveHeading02,
  productiveHeading03,
  productiveHeading04,
  productiveHeading05,
  productiveHeading06,
  productiveHeading07,
  expressiveHeading01,
  expressiveHeading02,
  expressiveHeading03,
  expressiveHeading04,
  expressiveHeading05,
  expressiveHeading06,
  expressiveParagraph01,
  quotation01,
  quotation02,
  display01,
  display02,
  display03,
  display04,
} from '@rocketsoftware/type';

export {
  spacing01,
  spacing02,
  spacing03,
  spacing04,
  spacing05,
  spacing06,
  spacing07,
  spacing08,
  spacing09,
  spacing10,
  spacing11,
  spacing12,
  spacing13,
  // Fluid spacing
  fluidSpacing01,
  fluidSpacing02,
  fluidSpacing03,
  fluidSpacing04,
  // Layout
  // Deprecated -- Remove in v11
  layout01,
  layout02,
  layout03,
  layout04,
  layout05,
  layout06,
  layout07,
  // Containers
  container01,
  container02,
  container03,
  container04,
  container05,
  // Icon sizes
  iconSize01,
  iconSize02,
} from '@rocketsoftware/layout';
