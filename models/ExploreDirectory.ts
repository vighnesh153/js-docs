import ExploreItemProps from './ExploreItemProps';
import ExploreFile from './ExploreFile';

interface ExploreDirectory extends ExploreItemProps {
  type: 'directory';
  content?: (ExploreDirectory | ExploreFile)[];
}

export default ExploreDirectory;
