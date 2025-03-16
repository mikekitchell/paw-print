import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonBackButton,
  IonButtons,
  IonToast,
} from "@ionic/react";
import { Storage } from "@capacitor/storage";
import { useHistory } from "react-router-dom";

// Import components
import ActivityTypeSelector from "../components/ActivityTypeSelector";
import TimestampDisplay from "../components/TimestampDisplay";
import PottyForm from "../components/PottyForm";
import FeedingForm from "../components/FeedingForm";
import WalkForm from "../components/WalkForm";
import SleepForm from "../components/SleepForm";
import TrainingForm from "../components/TrainingForm";

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
          <ActivityTypeSelector
            activityType={activityType}
            setActivityType={setActivityType}
            style={pageStyles}
          />

          {/* Current Time Display */}
          <TimestampDisplay timestamp={timestamp} style={pageStyles} />

          {/* Activity-specific form fields */}
          {activityType === "potty" && (
            <PottyForm
              pottyType={pottyType}
              setPottyType={setPottyType}
              pottySuccess={pottySuccess}
              setPottySuccess={setPottySuccess}
              pottyLocation={pottyLocation}
              setPottyLocation={setPottyLocation}
              style={pageStyles}
            />
          )}

          {activityType === "feeding" && (
            <FeedingForm
              foodAmount={foodAmount}
              setFoodAmount={setFoodAmount}
              foodType={foodType}
              setFoodType={setFoodType}
              style={pageStyles}
            />
          )}

          {activityType === "walk" && (
            <WalkForm
              walkDuration={walkDuration}
              setWalkDuration={setWalkDuration}
              walkNotes={walkNotes}
              setWalkNotes={setWalkNotes}
              style={pageStyles}
            />
          )}

          {activityType === "sleep" && (
            <SleepForm
              sleepDuration={sleepDuration}
              setSleepDuration={setSleepDuration}
              style={pageStyles}
            />
          )}

          {activityType === "training" && (
            <TrainingForm
              trainingCommand={trainingCommand}
              setTrainingCommand={setTrainingCommand}
              trainingSuccess={trainingSuccess}
              setTrainingSuccess={setTrainingSuccess}
              style={pageStyles}
            />
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
