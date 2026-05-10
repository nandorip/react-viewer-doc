import styled from '@emotion/styled';

export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  overflow: hidden;
`;

export const SidebarContainer = styled.div<{ visible: boolean }>`
  width: ${props => (props.visible ? '200px' : '0')};
  transition: width 0.3s ease;
  background-color: #f0f0f0;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  overflow-x: hidden;
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

  &:hover {
    background-color: #f5f5f5;
  }

  canvas {
    max-width: 100% !important;
    height: auto !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  padding: 0 8px;
  background-color: white;
  height: 40px;
  width: 100%;
  text-align: center;
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
  justify-content: center;
  width: 100%;
  height: ${props => (typeof props.height === 'number' ? `${props.height}px` : props.height || '600px')};
  padding: 16px;
  overflow: auto;
  background-color: #525659;
  border-radius: 0 0 12px 12px;

  canvas {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 16px;
  }
`;

export interface ImageContainerProps {
  zoom: number;
  rotation: number;
  height?: string | number;
}

export const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: ${props => (typeof props.height === 'number' ? `${props.height}px` : props.height || '600px')};
  padding: 16px;
  overflow: hidden;
  border-radius: 0 0 12px 12px;
  background-color: #f5f5f5;

  img {
    max-width: 100%;
    max-height: 100%;
    transition: transform 0.3s ease;
    transform: rotate(${props => props.rotation}deg) scale(${props => props.zoom});
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
`;

