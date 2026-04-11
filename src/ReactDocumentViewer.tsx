import { Container } from './components';
import { Viewer } from './Viewer';

type Props = {
  document?: { fileData?: string; fileUri?: string; fileName: string };
  extraToolbar?: React.ReactNode;
};

export const ReactDocumentViewer = ({ document, extraToolbar }: Props) => (
  <Container>
    <Viewer document={{ document }} extraToolbar={extraToolbar} />
  </Container>
);
