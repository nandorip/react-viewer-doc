import styled from '@emotion/styled';

export const ContainerDiv = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  height: 100%;
  width: 100%;
  gap: 8px;
  text-align: center;
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

export const DocumentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 320px;
  padding: 16px;
  overflow: auto;
  scroll-margin: 100px;

  canvas {
    transition: all 0.5s;
  }
`;

export interface ImageContainerProps {
  zoom: number;
  rotation: number;
}

export const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 99%;
  height: 400px;
  padding: 16px;
  overflow: hidden;
  max-width: 100%;
  border-radius: 12px;

  img {
    max-width: 100%;
    max-height: 370px;
    transition: all 0.5s;
    rotate: ${props => props.rotation}deg;
    transform: scale(${props => props.zoom});
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

