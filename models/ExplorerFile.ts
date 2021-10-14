import ExplorerItemProps from './ExplorerItemProps';

interface ExplorerFile extends ExplorerItemProps {
  type: 'file';
  content?: string;
}

export default ExplorerFile;
