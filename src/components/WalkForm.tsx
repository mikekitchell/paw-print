import React from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";

interface WalkFormProps {
  walkDuration: string;
  setWalkDuration: (duration: string) => void;
  walkNotes: string;
  setWalkNotes: (notes: string) => void;
}

const WalkForm: React.FC<WalkFormProps> = ({
  walkDuration,
  setWalkDuration,
  walkNotes,
  setWalkNotes,
}) => {
  return (
    <>
      <IonItem className="form-item">
        <IonLabel position="stacked" className="form-label">
          Duration (minutes)
        </IonLabel>
        <IonInput
          type="number"
          value={walkDuration}
          onIonChange={(e) => setWalkDuration(e.detail.value!)}
          className="form-input"
          placeholder="Enter duration"
        ></IonInput>
      </IonItem>
      <IonItem className="form-item">
        <IonLabel position="stacked" className="form-label">
          Notes (optional)
        </IonLabel>
        <IonInput
          value={walkNotes}
          onIonChange={(e) => setWalkNotes(e.detail.value!)}
          className="form-input"
          placeholder="Add any notes"
        ></IonInput>
      </IonItem>
    </>
  );
};

export default WalkForm;
