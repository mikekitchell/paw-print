import React from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";

interface SleepFormProps {
  sleepDuration: string;
  setSleepDuration: (duration: string) => void;
}

const SleepForm: React.FC<SleepFormProps> = ({
  sleepDuration,
  setSleepDuration,
}) => {
  return (
    <IonItem className="form-item">
      <IonLabel position="stacked" className="form-label">
        Duration (minutes)
      </IonLabel>
      <IonInput
        type="number"
        value={sleepDuration}
        onIonChange={(e) => setSleepDuration(e.detail.value!)}
        className="form-input"
        placeholder="Enter duration"
      ></IonInput>
    </IonItem>
  );
};

export default SleepForm;
