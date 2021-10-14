import ExplorerItemProps from './ExplorerItemProps';
import ExplorerFile from './ExplorerFile';

interface ExplorerDirectory extends ExplorerItemProps {
  type: 'directory';
  content?: (ExplorerDirectory | ExplorerFile)[];
}

export default ExplorerDirectory;
