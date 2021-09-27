import React from 'react';

import Tabs from 'components/Tabs';

interface ViewProps {}

const View: React.FC<ViewProps> = (props) => {
  return (
    <React.Fragment>
      <Tabs />
    </React.Fragment>
  );
};

export default View;
