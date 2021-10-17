import React, { useContext, useMemo } from 'react';
import { useRouter } from 'next/router';

import GlobalsContext from 'contexts/GlobalsContext';

const useWarnUserForUnsavedChanges = () => {
  const globalContext = useContext(GlobalsContext);
  const router = useRouter();
  const saveRequired = useMemo(
    () => globalContext.unsavedFileIds.size > 0,
    [globalContext.unsavedFileIds]
  );

  React.useEffect(() => {
    const confirmationMessage = 'Unsaved changes will be lost.';

    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    };
    const beforeRouteHandler = (url: string) => {
      if (router.pathname !== url && !confirm(confirmationMessage)) {
        // to inform NProgress or something ...
        router.events.emit('routeChangeError');
        // tslint:disable-next-line: no-string-throw
        throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
      }
    };

    if (saveRequired) {
      window.addEventListener('beforeunload', beforeUnloadHandler);
      router.events.on('routeChangeStart', beforeRouteHandler);
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      router.events.off('routeChangeStart', beforeRouteHandler);
    }
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      router.events.off('routeChangeStart', beforeRouteHandler);
    };
  }, [saveRequired]);
};

export default useWarnUserForUnsavedChanges;
