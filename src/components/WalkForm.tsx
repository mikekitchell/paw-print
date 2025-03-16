import React from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";

interface WalkFormProps {
  walkDuration: string;
  setWalkDuration: (duration: string) => void;
  walkNotes: string;
  setWalkNotes: (notes: string) => void;
  style?: any;
}

const WalkForm: React.FC<WalkFormProps> = ({
  walkDuration,
  setWalkDuration,
  walkNotes,
  setWalkNotes,
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
          Duration (minutes)
        </IonLabel>
        <IonInput
          type="number"
          value={walkDuration}
          onIonChange={(e) => setWalkDuration(e.detail.value!)}
          style={inputStyle}
          placeholder="Enter duration"
        ></IonInput>
      </IonItem>
      <IonItem style={itemStyle}>
        <IonLabel position="stacked" style={labelStyle}>
          Notes (optional)
        </IonLabel>
        <IonInput
          value={walkNotes}
          onIonChange={(e) => setWalkNotes(e.detail.value!)}
          style={inputStyle}
          placeholder="Add any notes"
        ></IonInput>
      </IonItem>
    </>
  );
};

export default WalkForm;
