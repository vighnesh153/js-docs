import React from 'react';

import FilePage from 'components/FilePage';

const PublicFile: React.FC = () => {
  return <FilePage isPrivate={false} />;
};

export default PublicFile;
