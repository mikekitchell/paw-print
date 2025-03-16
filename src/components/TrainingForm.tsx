import React from "react";
import { IonItem, IonLabel, IonInput, IonToggle } from "@ionic/react";

interface TrainingFormProps {
  trainingCommand: string;
  setTrainingCommand: (command: string) => void;
  trainingSuccess: boolean;
  setTrainingSuccess: (success: boolean) => void;
}

const TrainingForm: React.FC<TrainingFormProps> = ({
  trainingCommand,
  setTrainingCommand,
  trainingSuccess,
  setTrainingSuccess,
}) => {
  return (
    <>
      <IonItem className="form-item">
        <IonLabel position="stacked" className="form-label">
          Command/Skill
        </IonLabel>
        <IonInput
          value={trainingCommand}
          onIonChange={(e) => setTrainingCommand(e.detail.value!)}
          className="form-input"
          placeholder="Enter command or skill"
        ></IonInput>
      </IonItem>
      <IonItem className="form-item">
        <IonLabel className="form-label">Success</IonLabel>
        <IonToggle
          checked={trainingSuccess}
          onIonChange={(e) => setTrainingSuccess(e.detail.checked)}
          className="h-7 w-14"
        ></IonToggle>
      </IonItem>
    </>
  );
};

export default TrainingForm;
