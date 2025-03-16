import React from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

interface ActivityTypeSelectorProps {
  activityType: string;
  setActivityType: (type: string) => void;
}

const ActivityTypeSelector: React.FC<ActivityTypeSelectorProps> = ({
  activityType,
  setActivityType,
}) => {
  return (
    <IonItem lines="full" className="form-item">
      <IonLabel className="form-label">Activity Type</IonLabel>
      <IonSelect
        value={activityType}
        onIonChange={(e) => setActivityType(e.detail.value)}
        className="text-lg"
        interface="action-sheet"
      >
        <IonSelectOption value="potty">Potty Break</IonSelectOption>
        <IonSelectOption value="feeding">Feeding</IonSelectOption>
        <IonSelectOption value="walk">Walk/Exercise</IonSelectOption>
        <IonSelectOption value="sleep">Sleep/Nap</IonSelectOption>
        <IonSelectOption value="training">Training</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default ActivityTypeSelector;
