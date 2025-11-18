import { useState, useEffect } from 'react';
import { registerSW } from 'virtual:pwa-register';

export const useServiceWorker = () => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [updateSW, setUpdateSW] = useState<((reloadPage?: boolean) => Promise<void>) | null>(null);

  useEffect(() => {
    const updateSWFunc = registerSW({
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onOfflineReady() {
        setOfflineReady(true);
        console.log('App ready to work offline');
      },
    });

    setUpdateSW(() => updateSWFunc);
  }, []);

  const handleUpdate = async () => {
    if (updateSW) {
      await updateSW(true);
    }
  };

  const dismissUpdate = () => {
    setNeedRefresh(false);
  };

  return {
    needRefresh,
    offlineReady,
    handleUpdate,
    dismissUpdate,
  };
};
