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
  style?: any;
}

const PottyForm: React.FC<PottyFormProps> = ({
  pottyType,
  setPottyType,
  pottySuccess,
  setPottySuccess,
  pottyLocation,
  setPottyLocation,
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

  const selectStyle = {
    fontSize: "1.1rem",
    "--padding-start": "8px",
    "--padding-end": "8px",
    ...style.select,
  };

  return (
    <>
      <IonItem style={itemStyle}>
        <IonLabel style={labelStyle}>Type</IonLabel>
        <IonSelect
          value={pottyType}
          onIonChange={(e) => setPottyType(e.detail.value)}
          style={selectStyle}
          interface="action-sheet"
        >
          <IonSelectOption value="pee">Pee</IonSelectOption>
          <IonSelectOption value="poop">Poop</IonSelectOption>
          <IonSelectOption value="both">Both</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem style={itemStyle}>
        <IonLabel style={labelStyle}>Success</IonLabel>
        <IonToggle
          checked={pottySuccess}
          onIonChange={(e) => setPottySuccess(e.detail.checked)}
          style={{
            "--handle-width": "28px",
            "--handle-height": "28px",
          }}
        ></IonToggle>
      </IonItem>
      <IonItem style={itemStyle}>
        <IonLabel style={labelStyle}>Location</IonLabel>
        <IonSelect
          value={pottyLocation}
          onIonChange={(e) => setPottyLocation(e.detail.value)}
          style={selectStyle}
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
