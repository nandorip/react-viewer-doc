import { DisplayPage } from '../../../styles';

interface Props {
  totalPages: number;
  page: number;
}

export const DisplayPageNumber = ({ totalPages, page }: Props) => (
  <DisplayPage>{`${page} / ${totalPages}`}</DisplayPage>
);
