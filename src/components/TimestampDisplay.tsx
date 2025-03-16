import React from "react";
import { IonItem, IonLabel } from "@ionic/react";

interface TimestampDisplayProps {
  timestamp: string;
  style?: any;
}

const TimestampDisplay: React.FC<TimestampDisplayProps> = ({
  timestamp,
  style = {},
}) => {
  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const itemStyle = {
    "--min-height": "60px",
    "--padding-top": "8px",
    "--padding-bottom": "8px",
    marginBottom: "8px",
    ...style.item,
  };

  const labelStyle = {
    fontSize: "1.1rem",
    fontWeight: "500",
    ...style.label,
  };

  const valueLabelStyle = {
    textAlign: "right",
    color: "var(--ion-color-medium)",
    fontSize: "1.1rem",
    ...style.valueLabel,
  };

  return (
    <IonItem lines="full" style={itemStyle}>
      <IonLabel style={labelStyle}>Time</IonLabel>
      <IonLabel slot="end" style={valueLabelStyle}>
        {formatDateTime(timestamp)}
      </IonLabel>
    </IonItem>
  );
};

export default TimestampDisplay;
