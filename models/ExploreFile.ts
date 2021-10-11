import ExploreItemProps from './ExploreItemProps';

interface ExploreFile extends ExploreItemProps {
  type: 'file';
  content?: string;
}

export default ExploreFile;
