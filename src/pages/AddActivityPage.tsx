import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonSegment,
  IonSegmentButton,
  IonBackButton,
  IonButtons,
  IonToast,
  IonToggle,
  IonModal,
} from "@ionic/react";
import { Storage } from "@capacitor/storage";
import { useHistory } from "react-router-dom";

const pageStyles = {
  title: {
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  list: {
    padding: "16px",
  },
  item: {
    "--min-height": "60px",
    "--padding-top": "8px",
    "--padding-bottom": "8px",
    marginBottom: "8px",
  },
  label: {
    fontSize: "1.1rem",
    fontWeight: "500",
  },
  select: {
    fontSize: "1.1rem",
    "--padding-start": "8px",
    "--padding-end": "8px",
  },
  input: {
    fontSize: "1.1rem",
  },
  saveButton: {
    margin: "24px 16px",
    "--padding-top": "20px",
    "--padding-bottom": "20px",
    fontSize: "1.1rem",
  },
};

const AddActivityPage: React.FC = () => {
  const history = useHistory();
  const [activityType, setActivityType] = useState<string>("potty");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Common fields
  const [timestamp, setTimestamp] = useState<string>(new Date().toISOString());

  // Potty specific fields
  const [pottyType, setPottyType] = useState<string>("pee");
  const [pottySuccess, setPottySuccess] = useState<boolean>(true);
  const [pottyLocation, setPottyLocation] = useState<string>("outside");

  // Feeding specific fields
  const [foodAmount, setFoodAmount] = useState<string>("");
  const [foodType, setFoodType] = useState<string>("kibble");

  // Walk specific fields
  const [walkDuration, setWalkDuration] = useState<string>("");
  const [walkNotes, setWalkNotes] = useState<string>("");

  // Sleep specific fields
  const [sleepDuration, setSleepDuration] = useState<string>("");

  // Training specific fields
  const [trainingCommand, setTrainingCommand] = useState<string>("");
  const [trainingSuccess, setTrainingSuccess] = useState<boolean>(true);

  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const saveActivity = async () => {
    // Generate a unique ID for the activity
    const id = Date.now().toString();

    // Create details object based on activity type
    let details = {};

    switch (activityType) {
      case "potty":
        details = {
          pottyType,
          success: pottySuccess,
          location: pottyLocation,
        };
        break;
      case "feeding":
        details = {
          amount: foodAmount,
          foodType,
        };
        break;
      case "walk":
        details = {
          duration: walkDuration,
          notes: walkNotes,
        };
        break;
      case "sleep":
        details = {
          duration: sleepDuration,
        };
        break;
      case "training":
        details = {
          command: trainingCommand,
          success: trainingSuccess,
        };
        break;
    }

    // Create activity object
    const activity = {
      id,
      type: activityType,
      timestamp,
      details,
    };

    try {
      // Get existing activities
      const { value } = await Storage.get({ key: "pawprint_activities" });
      let activities = [];

      if (value) {
        activities = JSON.parse(value);
      }

      // Add new activity
      activities.push(activity);

      // Save updated activities
      await Storage.set({
        key: "pawprint_activities",
        value: JSON.stringify(activities),
      });

      setToastMessage("Activity saved successfully!");
      setShowToast(true);

      // Navigate back to activity log after short delay
      setTimeout(() => {
        history.push("/activity-log");
      }, 1000);
    } catch (error) {
      console.error("Failed to save activity:", error);
      setToastMessage("Failed to save activity. Please try again.");
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/activity-log" />
          </IonButtons>
          <IonTitle style={pageStyles.title}>Add Activity</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList style={pageStyles.list}>
          {/* Activity Type Selector */}
          <IonItem lines="full" style={pageStyles.item}>
            <IonLabel style={pageStyles.label}>Activity Type</IonLabel>
            <IonSelect
              value={activityType}
              onIonChange={(e) => setActivityType(e.detail.value)}
              style={pageStyles.select}
              interface="action-sheet"
            >
              <IonSelectOption value="potty">Potty Break</IonSelectOption>
              <IonSelectOption value="feeding">Feeding</IonSelectOption>
              <IonSelectOption value="walk">Walk/Exercise</IonSelectOption>
              <IonSelectOption value="sleep">Sleep/Nap</IonSelectOption>
              <IonSelectOption value="training">Training</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* Current Time Display */}
          <IonItem lines="full" style={pageStyles.item}>
            <IonLabel style={pageStyles.label}>Time</IonLabel>
            <IonLabel
              slot="end"
              style={{
                textAlign: "right",
                color: "var(--ion-color-medium)",
                fontSize: "1.1rem",
              }}
            >
              {formatDateTime(timestamp)}
            </IonLabel>
          </IonItem>

          {/* Potty Break Fields */}
          {activityType === "potty" && (
            <>
              <IonItem style={pageStyles.item}>
                <IonLabel style={pageStyles.label}>Type</IonLabel>
                <IonSelect
                  value={pottyType}
                  onIonChange={(e) => setPottyType(e.detail.value)}
                  style={pageStyles.select}
                  interface="action-sheet"
                >
                  <IonSelectOption value="pee">Pee</IonSelectOption>
                  <IonSelectOption value="poop">Poop</IonSelectOption>
                  <IonSelectOption value="both">Both</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem style={pageStyles.item}>
                <IonLabel style={pageStyles.label}>Success</IonLabel>
                <IonToggle
                  checked={pottySuccess}
                  onIonChange={(e) => setPottySuccess(e.detail.checked)}
                  style={{
                    "--handle-width": "28px",
                    "--handle-height": "28px",
                  }}
                ></IonToggle>
              </IonItem>
              <IonItem style={pageStyles.item}>
                <IonLabel style={pageStyles.label}>Location</IonLabel>
                <IonSelect
                  value={pottyLocation}
                  onIonChange={(e) => setPottyLocation(e.detail.value)}
                  style={pageStyles.select}
                  interface="action-sheet"
                >
                  <IonSelectOption value="outside">Outside</IonSelectOption>
                  <IonSelectOption value="inside">
                    Inside (Accident)
                  </IonSelectOption>
                  <IonSelectOption value="pad">Pee Pad</IonSelectOption>
                </IonSelect>
              </IonItem>
            </>
          )}

          {/* Feeding Fields */}
          {activityType === "feeding" && (
            <>
              <IonItem style={pageStyles.item}>
                <IonLabel position="stacked" style={pageStyles.label}>
                  Amount
                </IonLabel>
                <IonInput
                  value={foodAmount}
                  onIonChange={(e) => setFoodAmount(e.detail.value!)}
                  style={pageStyles.input}
                  placeholder="e.g., 1/2 cup"
                ></IonInput>
              </IonItem>
              <IonItem style={pageStyles.item}>
                <IonLabel style={pageStyles.label}>Food Type</IonLabel>
                <IonSelect
                  value={foodType}
                  onIonChange={(e) => setFoodType(e.detail.value)}
                  style={pageStyles.select}
                  interface="action-sheet"
                >
                  <IonSelectOption value="kibble">Kibble</IonSelectOption>
                  <IonSelectOption value="wet food">Wet Food</IonSelectOption>
                  <IonSelectOption value="treats">Treats</IonSelectOption>
                  <IonSelectOption value="special">
                    Special Diet
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
            </>
          )}

          {/* Walk Fields */}
          {activityType === "walk" && (
            <>
              <IonItem style={pageStyles.item}>
                <IonLabel position="stacked" style={pageStyles.label}>
                  Duration (minutes)
                </IonLabel>
                <IonInput
                  type="number"
                  value={walkDuration}
                  onIonChange={(e) => setWalkDuration(e.detail.value!)}
                  style={pageStyles.input}
                  placeholder="Enter duration"
                ></IonInput>
              </IonItem>
              <IonItem style={pageStyles.item}>
                <IonLabel position="stacked" style={pageStyles.label}>
                  Notes (optional)
                </IonLabel>
                <IonInput
                  value={walkNotes}
                  onIonChange={(e) => setWalkNotes(e.detail.value!)}
                  style={pageStyles.input}
                  placeholder="Add any notes"
                ></IonInput>
              </IonItem>
            </>
          )}

          {/* Sleep Fields */}
          {activityType === "sleep" && (
            <IonItem style={pageStyles.item}>
              <IonLabel position="stacked" style={pageStyles.label}>
                Duration (minutes)
              </IonLabel>
              <IonInput
                type="number"
                value={sleepDuration}
                onIonChange={(e) => setSleepDuration(e.detail.value!)}
                style={pageStyles.input}
                placeholder="Enter duration"
              ></IonInput>
            </IonItem>
          )}

          {/* Training Fields */}
          {activityType === "training" && (
            <>
              <IonItem style={pageStyles.item}>
                <IonLabel position="stacked" style={pageStyles.label}>
                  Command/Skill
                </IonLabel>
                <IonInput
                  value={trainingCommand}
                  onIonChange={(e) => setTrainingCommand(e.detail.value!)}
                  style={pageStyles.input}
                  placeholder="Enter command or skill"
                ></IonInput>
              </IonItem>
              <IonItem style={pageStyles.item}>
                <IonLabel style={pageStyles.label}>Success</IonLabel>
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
          )}
        </IonList>

        {/* Save Button */}
        <IonButton
          expand="block"
          onClick={saveActivity}
          style={pageStyles.saveButton}
        >
          Save Activity
        </IonButton>

        {/* Toast Notification */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          style={{ fontSize: "1.1rem" }}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddActivityPage;
