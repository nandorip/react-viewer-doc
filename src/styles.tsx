import styled from '@emotion/styled';

const MOBILE = '@media (max-width: 768px)';
const SMALL = '@media (max-width: 480px)';

const resolveViewerHeight = (height?: string | number) => {
  if (typeof height === 'number') return `${height}px`;
  if (height) return height;
  return 'clamp(280px, 60vh, 600px)';
};

export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  height: 100%;
  width: 100%;
  min-width: 0;
  overflow: hidden;

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

export const SidebarContainer = styled.div<{ visible: boolean }>`
  flex: 0 0 auto;
  width: ${props => (props.visible ? '200px' : '0')};
  transition: width 0.3s ease, max-height 0.3s ease;
  background-color: #f0f0f0;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  overflow-x: hidden;

  ${MOBILE} {
    width: 100%;
    max-height: ${props => (props.visible ? '132px' : '0')};
    border-right: none;
    border-bottom: ${props => (props.visible ? '1px solid #e0e0e0' : 'none')};
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

export const ThumbnailItem = styled.div<{ active: boolean }>`
  padding: 8px;
  cursor: pointer;
  background-color: ${props => (props.active ? '#e3f2fd' : 'transparent')};
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;

  &:hover {
    background-color: #f5f5f5;
  }

  canvas {
    max-width: 100% !important;
    height: auto !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  ${MOBILE} {
    min-width: 88px;
    padding: 6px;
    border-bottom: none;
    border-right: 1px solid #e0e0e0;
  }
`;

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  padding: 4px 8px;
  background-color: white;
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

export const DocumentContainer = styled.div<{ height?: string | number }>`
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
  background-color: #525659;
  border-radius: 0 0 12px 12px;
  -webkit-overflow-scrolling: touch;

  canvas {
    max-width: 100% !important;
    height: auto !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  zoom: number;
  rotation: number;
  height?: string | number;
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
  background-color: #f5f5f5;

  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    transition: transform 0.3s ease;
    transform: rotate(${props => props.rotation}deg) scale(${props => props.zoom});
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

export const DisplayPage = styled.div`
  border-radius: 8px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: #663c00;
  background-color: #fff4e5;
  opacity: 0.7;
  white-space: nowrap;

  ${SMALL} {
    padding: 2px 4px;
    font-size: 12px;
  }
`;