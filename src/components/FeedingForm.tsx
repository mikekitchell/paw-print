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
}

const FeedingForm: React.FC<FeedingFormProps> = ({
  foodAmount,
  setFoodAmount,
  foodType,
  setFoodType,
}) => {
  return (
    <>
      <IonItem className="form-item">
        <IonLabel position="stacked" className="form-label">
          Amount
        </IonLabel>
        <IonInput
          value={foodAmount}
          onIonChange={(e) => setFoodAmount(e.detail.value!)}
          className="form-input"
          placeholder="e.g., 1/2 cup"
        ></IonInput>
      </IonItem>
      <IonItem className="form-item">
        <IonLabel className="form-label">Food Type</IonLabel>
        <IonSelect
          value={foodType}
          onIonChange={(e) => setFoodType(e.detail.value)}
          className="text-lg"
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
