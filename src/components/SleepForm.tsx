import React from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";

interface SleepFormProps {
  sleepDuration: string;
  setSleepDuration: (duration: string) => void;
  style?: any;
}

const SleepForm: React.FC<SleepFormProps> = ({
  sleepDuration,
  setSleepDuration,
  style = {},
}) => {
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

  const inputStyle = {
    fontSize: "1.1rem",
    ...style.input,
  };

  return (
    <IonItem style={itemStyle}>
      <IonLabel position="stacked" style={labelStyle}>
        Duration (minutes)
      </IonLabel>
      <IonInput
        type="number"
        value={sleepDuration}
        onIonChange={(e) => setSleepDuration(e.detail.value!)}
        style={inputStyle}
        placeholder="Enter duration"
      ></IonInput>
    </IonItem>
  );
};

export default SleepForm;
