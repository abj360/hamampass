// hooks/useTrack.ts
import { useCallback } from "react";

interface TrackEventProps {
  event: string;
  properties?: Record<string, any>;
}

const useTrack = () => {
  const trackEvent = useCallback(
    async ({ event, properties = {} }: TrackEventProps) => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ event, properties }),
        });
      } catch (error) {
        console.error("Error sending tracking event:", error);
      }
    },
    []
  );

  return trackEvent;
};

export default useTrack;
