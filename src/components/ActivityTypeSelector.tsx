import React from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

interface ActivityTypeSelectorProps {
  activityType: string;
  setActivityType: (type: string) => void;
  style?: any;
}

const ActivityTypeSelector: React.FC<ActivityTypeSelectorProps> = ({
  activityType,
  setActivityType,
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
    <IonItem lines="full" style={itemStyle}>
      <IonLabel style={labelStyle}>Activity Type</IonLabel>
      <IonSelect
        value={activityType}
        onIonChange={(e) => setActivityType(e.detail.value)}
        style={selectStyle}
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
