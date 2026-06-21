import { ContainerDiv } from '../../styles';
import { ViewerTheme } from '../../types';

export const Container = ({
  children,
  theme = 'light',
}: {
  children: React.ReactNode;
  theme?: ViewerTheme;
}) => (
  <ContainerDiv theme={theme}>{children}</ContainerDiv>
);
