import React from "react";
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
} from "@ionic/react";

interface FeedingFormProps {
  foodAmount: string;
  setFoodAmount: (amount: string) => void;
  foodType: string;
  setFoodType: (type: string) => void;
  style?: any;
}

const FeedingForm: React.FC<FeedingFormProps> = ({
  foodAmount,
  setFoodAmount,
  foodType,
  setFoodType,
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

  const inputStyle = {
    fontSize: "1.1rem",
    ...style.input,
  };

  return (
    <>
      <IonItem style={itemStyle}>
        <IonLabel position="stacked" style={labelStyle}>
          Amount
        </IonLabel>
        <IonInput
          value={foodAmount}
          onIonChange={(e) => setFoodAmount(e.detail.value!)}
          style={inputStyle}
          placeholder="e.g., 1/2 cup"
        ></IonInput>
      </IonItem>
      <IonItem style={itemStyle}>
        <IonLabel style={labelStyle}>Food Type</IonLabel>
        <IonSelect
          value={foodType}
          onIonChange={(e) => setFoodType(e.detail.value)}
          style={selectStyle}
          interface="action-sheet"
        >
          <IonSelectOption value="kibble">Kibble</IonSelectOption>
          <IonSelectOption value="wet food">Wet Food</IonSelectOption>
          <IonSelectOption value="treats">Treats</IonSelectOption>
          <IonSelectOption value="special">Special Diet</IonSelectOption>
        </IonSelect>
      </IonItem>
    </>
  );
};

export default FeedingForm;
