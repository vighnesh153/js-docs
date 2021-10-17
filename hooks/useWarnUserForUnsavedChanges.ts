import React, { useContext, useMemo } from 'react';
// import { useRouter } from 'next/router';

import GlobalsContext from 'contexts/GlobalsContext';
import JsDocsAuthContext from 'contexts/AuthContext';

const useWarnUserForUnsavedChanges = () => {
  const globalContext = useContext(GlobalsContext);
  const { isAdmin } = useContext(JsDocsAuthContext);
  // const router = useRouter();
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

    // For route changes
    // const beforeRouteHandler = (url: string) => {
    //   if (router.pathname !== url && !confirm(confirmationMessage)) {
    //     // to inform NProgress or something ...
    //     router.events.emit('routeChangeError');
    //     // tslint:disable-next-line: no-string-throw
    //     throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
    //   }
    // };

    if (isAdmin && saveRequired) {
      window.addEventListener('beforeunload', beforeUnloadHandler);
      // router.events.on('routeChangeStart', beforeRouteHandler);  // For route changes
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      // router.events.off('routeChangeStart', beforeRouteHandler); // For route changes
    }
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      // router.events.off('routeChangeStart', beforeRouteHandler); // For route changes
    };
  }, [saveRequired, isAdmin]);
};

export default useWarnUserForUnsavedChanges;
