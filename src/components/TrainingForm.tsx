import React from "react";
import { IonItem, IonLabel, IonInput, IonToggle } from "@ionic/react";

interface TrainingFormProps {
  trainingCommand: string;
  setTrainingCommand: (command: string) => void;
  trainingSuccess: boolean;
  setTrainingSuccess: (success: boolean) => void;
  style?: any;
}

const TrainingForm: React.FC<TrainingFormProps> = ({
  trainingCommand,
  setTrainingCommand,
  trainingSuccess,
  setTrainingSuccess,
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
    <>
      <IonItem style={itemStyle}>
        <IonLabel position="stacked" style={labelStyle}>
          Command/Skill
        </IonLabel>
        <IonInput
          value={trainingCommand}
          onIonChange={(e) => setTrainingCommand(e.detail.value!)}
          style={inputStyle}
          placeholder="Enter command or skill"
        ></IonInput>
      </IonItem>
      <IonItem style={itemStyle}>
        <IonLabel style={labelStyle}>Success</IonLabel>
        <IonToggle
          checked={trainingSuccess}
          onIonChange={(e) => setTrainingSuccess(e.detail.checked)}
          style={{
            "--handle-width": "28px",
            "--handle-height": "28px",
          }}
        ></IonToggle>
      </IonItem>
    </>
  );
};

export default TrainingForm;
