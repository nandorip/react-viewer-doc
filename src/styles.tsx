import styled from '@emotion/styled';
import { resolveThemeTokens } from './theme';
import { ViewerTheme } from './types';

const MOBILE = '@media (max-width: 768px)';
const SMALL = '@media (max-width: 480px)';

const resolveViewerHeight = (height?: string | number) => {
  if (typeof height === 'number') return `${height}px`;
  if (height) return height;
  return 'clamp(280px, 60vh, 600px)';
};

interface ThemedProps {
  theme?: ViewerTheme;
}

export const ContainerDiv = styled.div<ThemedProps>`
  display: flex;
  flex-direction: column;
  background-color: ${props => resolveThemeTokens(props.theme).containerBg};
  border: 1px solid ${props => resolveThemeTokens(props.theme).containerBorder};
  border-radius: 12px;
  height: 100%;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  color-scheme: ${props => (props.theme === 'dark' ? 'dark' : 'light')};

  ${SMALL} {
    border-radius: 8px;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: 0;
  min-width: 0;
`;

export const PdfViewerRoot = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 0;
  min-width: 0;

  .react-pdf__Document {
    display: flex;
    flex: 1;
    position: relative;
    overflow: hidden;
    width: 100%;
    min-height: 0;
    min-width: 0;
  }

  ${MOBILE} {
    .react-pdf__Document {
      flex-direction: column;
    }
  }
`;

export const SidebarContainer = styled.div<{ visible: boolean } & ThemedProps>`
  flex: 0 0 auto;
  width: ${props => (props.visible ? '200px' : '0')};
  transition: width 0.3s ease, max-height 0.3s ease;
  background-color: ${props => resolveThemeTokens(props.theme).sidebarBg};
  border-right: 1px solid ${props => resolveThemeTokens(props.theme).sidebarBorder};
  overflow-y: auto;
  overflow-x: hidden;

  ${MOBILE} {
    width: 100%;
    max-height: ${props => (props.visible ? '132px' : '0')};
    border-right: none;
    border-bottom: ${props => (props.visible ? `1px solid ${resolveThemeTokens(props.theme).sidebarBorder}` : 'none')};
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

export const ThumbnailItem = styled.div<{ active: boolean } & ThemedProps>`
  padding: 8px;
  cursor: pointer;
  background-color: ${props =>
    props.active
      ? resolveThemeTokens(props.theme).thumbnailActive
      : 'transparent'};
  border-bottom: 1px solid ${props => resolveThemeTokens(props.theme).sidebarBorder};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  color: ${props => resolveThemeTokens(props.theme).textMuted};

  &:hover {
    background-color: ${props => resolveThemeTokens(props.theme).thumbnailHover};
  }

  canvas {
    max-width: 100% !important;
    height: auto !important;
    box-shadow: 0 2px 4px ${props => resolveThemeTokens(props.theme).shadow};
  }

  ${MOBILE} {
    min-width: 88px;
    padding: 6px;
    border-bottom: none;
    border-right: 1px solid ${props => resolveThemeTokens(props.theme).sidebarBorder};
  }
`;

export const ThumbnailPlaceholder = styled.div<ThemedProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => resolveThemeTokens(props.theme).loadingPlaceholder};
  color: ${props => resolveThemeTokens(props.theme).textMuted};
  font-size: 11px;
  border-radius: 4px;
  min-height: 96px;
`;

export const ToolbarContainer = styled.div<ThemedProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  padding: 4px 8px;
  background-color: ${props => resolveThemeTokens(props.theme).toolbarBg};
  min-height: 40px;
  width: 100%;
  min-width: 0;
  text-align: center;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  ${MOBILE} {
    align-items: flex-start;
    padding: 6px 4px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
`;

export const ToolbarFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  text-align: center;
`;

export const SelectContainer = styled.div`
  width: 40%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const DocumentContainer = styled.div<{ height?: string | number } & ThemedProps>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-width: 0;
  min-height: 240px;
  height: ${props => resolveViewerHeight(props.height)};
  padding: 16px;
  overflow: auto;
  background-color: ${props => resolveThemeTokens(props.theme).pdfViewerBg};
  border-radius: 0 0 12px 12px;
  -webkit-overflow-scrolling: touch;
  color: ${props => resolveThemeTokens(props.theme).textMuted};

  canvas {
    max-width: 100% !important;
    height: auto !important;
    box-shadow: 0 4px 8px ${props => resolveThemeTokens(props.theme).pdfShadow};
    margin-bottom: 16px;
  }

  ${MOBILE} {
    padding: 8px;
    border-radius: 0 0 8px 8px;
    height: ${props => {
      if (typeof props.height === 'number') {
        return `min(${props.height}px, 55vh)`;
      }
      if (props.height) {
        return `min(${props.height}, 55vh)`;
      }
      return 'clamp(240px, 55vh, 600px)';
    }};
  }
`;

export interface ImageContainerProps {
  rotation: number;
  height?: string | number;
  theme?: ViewerTheme;
}

export const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 0;
  min-height: 240px;
  height: ${props => resolveViewerHeight(props.height)};
  padding: 16px;
  overflow: hidden;
  border-radius: 0 0 12px 12px;
  background-color: ${props => resolveThemeTokens(props.theme).imageViewerBg};
  color: ${props => resolveThemeTokens(props.theme).textMuted};

  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    transition: transform 0.3s ease;
    transform: rotate(${props => props.rotation}deg);
    box-shadow: 0 4px 8px ${props => resolveThemeTokens(props.theme).shadow};
  }

  ${MOBILE} {
    padding: 8px;
    border-radius: 0 0 8px 8px;
    height: ${props => {
      if (typeof props.height === 'number') {
        return `min(${props.height}px, 55vh)`;
      }
      if (props.height) {
        return `min(${props.height}, 55vh)`;
      }
      return 'clamp(240px, 55vh, 600px)';
    }};
  }
`;

export const DisplayPage = styled.div<ThemedProps>`
  border-radius: 8px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: ${props => resolveThemeTokens(props.theme).pageIndicatorColor};
  background-color: ${props => resolveThemeTokens(props.theme).pageIndicatorBg};
  opacity: 0.9;
  white-space: nowrap;

  ${SMALL} {
    padding: 2px 4px;
    font-size: 12px;
  }
`;

export const LoadingMessage = styled.div<ThemedProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 120px;
  color: ${props => resolveThemeTokens(props.theme).textMuted};
`;