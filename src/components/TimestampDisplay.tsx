import React from "react";
import { IonItem, IonLabel } from "@ionic/react";

interface TimestampDisplayProps {
  timestamp: string;
}

const TimestampDisplay: React.FC<TimestampDisplayProps> = ({ timestamp }) => {
  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <IonItem lines="full" className="form-item">
      <IonLabel className="form-label">Time</IonLabel>
      <IonLabel slot="end" className="text-right text-medium text-lg">
        {formatDateTime(timestamp)}
      </IonLabel>
    </IonItem>
  );
};

export default TimestampDisplay;
