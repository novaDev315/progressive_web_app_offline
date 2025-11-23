import { useStore } from '../store';
import { MdSignalWifiOff } from 'react-icons/md';

export const OfflineBanner = () => {
  const { isOnline } = useStore();

  if (isOnline) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
        <MdSignalWifiOff size={18} />
        <span>You're offline. Changes will sync when you reconnect.</span>
      </div>
    </div>
  );
};
