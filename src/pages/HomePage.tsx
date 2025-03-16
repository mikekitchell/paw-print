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

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-xl font-semibold">Paw Print</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="p-4 flex flex-col h-full">
          <IonCard className="mb-4">
            <IonCardHeader>
              <IonCardTitle className="text-xl font-bold flex items-center">
                <IonIcon icon={paw} className="mr-2 text-primary" />
                Welcome to Paw Print
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p className="mb-4">
                Track your pet's daily activities including potty breaks,
                feeding, walks, sleep, and training sessions.
              </p>
              <div className="flex flex-col space-y-3">
                <IonButton
                  expand="block"
                  onClick={() => history.push("/add-activity")}
                  className="w-full"
                >
                  <IonIcon slot="start" icon={add} />
                  Add Activity
                </IonButton>
                <IonButton
                  expand="block"
                  color="secondary"
                  onClick={() => history.push("/activity-log")}
                  className="w-full"
                >
                  <IonIcon slot="start" icon={list} />
                  View Activity Log
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Activity Overview */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Activity Overview</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="4" className="ion-text-center">
                    <IonIcon icon={paw} size="large" color="primary" />
                    <p>{activityCounts.potty} Potty</p>
                  </IonCol>
                  <IonCol size="4" className="ion-text-center">
                    <IonIcon icon={nutrition} size="large" color="success" />
                    <p>{activityCounts.feeding} Meals</p>
                  </IonCol>
                  <IonCol size="4" className="ion-text-center">
                    <IonIcon icon={walk} size="large" color="tertiary" />
                    <p>{activityCounts.walk} Walks</p>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6" className="ion-text-center">
                    <IonIcon icon={bed} size="large" color="medium" />
                    <p>{activityCounts.sleep} Naps</p>
                  </IonCol>
                  <IonCol size="6" className="ion-text-center">
                    <IonIcon icon={school} size="large" color="warning" />
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
                    <IonIcon
                      icon={getActivityIcon(activity.type)}
                      slot="start"
                    />
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
