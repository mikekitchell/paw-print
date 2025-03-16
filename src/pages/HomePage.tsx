import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { paw, nutrition, walk, bed, school, add, list } from "ionicons/icons";
import { Storage } from "@capacitor/storage";
import { useHistory } from "react-router-dom";

interface ActivityCount {
  potty: number;
  feeding: number;
  walk: number;
  sleep: number;
  training: number;
}

const HomePage: React.FC = () => {
  const [activityCounts, setActivityCounts] = useState<ActivityCount>({
    potty: 0,
    feeding: 0,
    walk: 0,
    sleep: 0,
    training: 0,
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadActivityData();
  }, []);

  const loadActivityData = async () => {
    try {
      const { value } = await Storage.get({ key: "pawprint_activities" });
      if (value) {
        const activities = JSON.parse(value);

        // Count activities by type
        const counts = {
          potty: 0,
          feeding: 0,
          walk: 0,
          sleep: 0,
          training: 0,
        };

        activities.forEach((activity: any) => {
          if (Object.prototype.hasOwnProperty.call(counts, activity.type)) {
            counts[activity.type as keyof ActivityCount]++;
          }
        });

        setActivityCounts(counts);

        // Get recent activities (last 3)
        const recent = activities
          .sort(
            (a: any, b: any) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
          .slice(0, 3);

        setRecentActivities(recent);
      }
    } catch (error) {
      console.error("Failed to load activity data:", error);
    }
  };

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "potty":
        return paw;
      case "feeding":
        return nutrition;
      case "walk":
        return walk;
      case "sleep":
        return bed;
      case "training":
        return school;
      default:
        return paw;
    }
  };

  // Get activity color
  const getActivityColor = (type: string) => {
    switch (type) {
      case "potty":
        return "#3398db"; // Blue
      case "feeding":
        return "#2dcc71"; // Green
      case "walk":
        return "#ff7a77"; // Red/Pink
      case "sleep":
        return "#f2aa3d"; // Yellow/Orange
      case "training":
        return "#465864"; // Dark Blue/Gray
      default:
        return "#3398db";
    }
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Paw Print</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard style={{ marginBottom: "16px" }}>
          <IonCardHeader>
            <IonCardTitle>Welcome to Paw Print</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p style={{ marginBottom: "24px" }}>
              Track your pet&apos;s daily activities including potty breaks,
              feeding, walks, sleep, and training sessions.
            </p>
            <div>
              <IonButton
                expand="block"
                onClick={() => history.push("/add-activity")}
                style={{ marginBottom: "24px" }}
              >
                <IonIcon slot="start" icon={add} />
                Add Activity
              </IonButton>
              <IonButton
                expand="block"
                color="secondary"
                onClick={() => history.push("/activity-log")}
              >
                <IonIcon slot="start" icon={list} />
                View Activity Log
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Activity Overview */}
        <IonCard style={{ marginBottom: "16px" }}>
          <IonCardHeader>
            <IonCardTitle>Activity Overview</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="4" className="ion-text-center">
                  <div
                    style={{
                      backgroundColor: "#3398db",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px auto",
                    }}
                  >
                    <IonIcon icon={paw} size="large" color="light" />
                  </div>
                  <p>{activityCounts.potty} Potty</p>
                </IonCol>
                <IonCol size="4" className="ion-text-center">
                  <div
                    style={{
                      backgroundColor: "#2dcc71",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px auto",
                    }}
                  >
                    <IonIcon icon={nutrition} size="large" color="light" />
                  </div>
                  <p>{activityCounts.feeding} Meals</p>
                </IonCol>
                <IonCol size="4" className="ion-text-center">
                  <div
                    style={{
                      backgroundColor: "#ff7a77",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px auto",
                    }}
                  >
                    <IonIcon icon={walk} size="large" color="light" />
                  </div>
                  <p>{activityCounts.walk} Walks</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6" className="ion-text-center">
                  <div
                    style={{
                      backgroundColor: "#f2aa3d",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px auto",
                    }}
                  >
                    <IonIcon icon={bed} size="large" color="light" />
                  </div>
                  <p>{activityCounts.sleep} Naps</p>
                </IonCol>
                <IonCol size="6" className="ion-text-center">
                  <div
                    style={{
                      backgroundColor: "#465864",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px auto",
                    }}
                  >
                    <IonIcon icon={school} size="large" color="light" />
                  </div>
                  <p>{activityCounts.training} Training</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Recent Activities */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Recent Activities</IonCardTitle>
          </IonCardHeader>
          <IonList>
            {recentActivities.length === 0 ? (
              <IonItem>
                <IonLabel>No activities logged yet</IonLabel>
              </IonItem>
            ) : (
              recentActivities.map((activity) => (
                <IonItem key={activity.id}>
                  <div
                    style={{
                      backgroundColor: getActivityColor(activity.type),
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "16px",
                    }}
                  >
                    <IonIcon
                      icon={getActivityIcon(activity.type)}
                      color="light"
                    />
                  </div>
                  <IonLabel>
                    <h2 className="ion-text-capitalize">{activity.type}</h2>
                    <p>{formatTime(activity.timestamp)}</p>
                  </IonLabel>
                </IonItem>
              ))
            )}
          </IonList>
          <IonCardContent>
            <IonButton expand="block" fill="clear" routerLink="/activity-log">
              View All Activities
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
