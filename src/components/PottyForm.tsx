import React from "react";
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/react";

interface PottyFormProps {
  pottyType: string;
  setPottyType: (type: string) => void;
  pottySuccess: boolean;
  setPottySuccess: (success: boolean) => void;
  pottyLocation: string;
  setPottyLocation: (location: string) => void;
}

const PottyForm: React.FC<PottyFormProps> = ({
  pottyType,
  setPottyType,
  pottySuccess,
  setPottySuccess,
  pottyLocation,
  setPottyLocation,
}) => {
  return (
    <>
      <IonItem className="form-item">
        <IonLabel className="form-label">Type</IonLabel>
        <IonSelect
          value={pottyType}
          onIonChange={(e) => setPottyType(e.detail.value)}
          className="text-lg"
          interface="action-sheet"
        >
          <IonSelectOption value="pee">Pee</IonSelectOption>
          <IonSelectOption value="poop">Poop</IonSelectOption>
          <IonSelectOption value="both">Both</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem className="form-item">
        <IonLabel className="form-label">Success</IonLabel>
        <IonToggle
          checked={pottySuccess}
          onIonChange={(e) => setPottySuccess(e.detail.checked)}
          className="h-7 w-14"
        ></IonToggle>
      </IonItem>
      <IonItem className="form-item">
        <IonLabel className="form-label">Location</IonLabel>
        <IonSelect
          value={pottyLocation}
          onIonChange={(e) => setPottyLocation(e.detail.value)}
          className="text-lg"
          interface="action-sheet"
        >
          <IonSelectOption value="outside">Outside</IonSelectOption>
          <IonSelectOption value="inside">Inside (Accident)</IonSelectOption>
          <IonSelectOption value="pad">Pee Pad</IonSelectOption>
        </IonSelect>
      </IonItem>
    </>
  );
};

export default PottyForm;
