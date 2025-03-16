import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonItemGroup,
  IonItemDivider,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { Storage } from "@capacitor/storage";
import { add, paw, restaurant, walk, moon, school } from "ionicons/icons";
import { useHistory } from "react-router-dom";

interface Activity {
  id: string;
  type: string;
  timestamp: string;
  details: any;
}

interface GroupedActivities {
  [date: string]: Activity[];
}

const ActivityLogPage: React.FC = () => {
  const history = useHistory();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [groupedActivities, setGroupedActivities] = useState<GroupedActivities>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    setIsLoading(true);
    try {
      const { value } = await Storage.get({ key: "pawprint_activities" });

      if (value) {
        const parsedActivities: Activity[] = JSON.parse(value);
        // Sort activities by timestamp (newest first)
        parsedActivities.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setActivities(parsedActivities);

        // Group activities by date
        const grouped = groupActivitiesByDate(parsedActivities);
        setGroupedActivities(grouped);
      }
    } catch (error) {
      console.error("Failed to load activities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupActivitiesByDate = (activities: Activity[]): GroupedActivities => {
    return activities.reduce((groups: GroupedActivities, activity) => {
      const date = new Date(activity.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
      return groups;
    }, {});
  };

  const handleRefresh = async (event: CustomEvent) => {
    await loadActivities();
    event.detail.complete();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "potty":
        return paw;
      case "feeding":
        return restaurant;
      case "walk":
        return walk;
      case "sleep":
        return moon;
      case "training":
        return school;
      default:
        return paw;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "potty":
        return "success";
      case "feeding":
        return "warning";
      case "walk":
        return "primary";
      case "sleep":
        return "tertiary";
      case "training":
        return "secondary";
      default:
        return "medium";
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderActivityDetails = (activity: Activity) => {
    switch (activity.type) {
      case "potty":
        return (
          <>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium mr-2">Type:</span>
              <span className="text-sm capitalize">
                {activity.details.pottyType}
              </span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium mr-2">Success:</span>
              <span className="text-sm">
                {activity.details.success ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium mr-2">Location:</span>
              <span className="text-sm capitalize">
                {activity.details.location}
              </span>
            </div>
          </>
        );
      case "feeding":
        return (
          <>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium mr-2">Amount:</span>
              <span className="text-sm">{activity.details.amount}</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium mr-2">Food Type:</span>
              <span className="text-sm capitalize">
                {activity.details.foodType}
              </span>
            </div>
          </>
        );
      case "walk":
        return (
          <>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium mr-2">Duration:</span>
              <span className="text-sm">
                {activity.details.duration} minutes
              </span>
            </div>
            {activity.details.notes && (
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium mr-2">Notes:</span>
                <span className="text-sm">{activity.details.notes}</span>
              </div>
            )}
          </>
        );
      case "sleep":
        return (
          <div className="flex items-center mt-1">
            <span className="text-sm font-medium mr-2">Duration:</span>
            <span className="text-sm">{activity.details.duration} minutes</span>
          </div>
        );
      case "training":
        return (
          <>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium mr-2">Command:</span>
              <span className="text-sm">{activity.details.command}</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium mr-2">Success:</span>
              <span className="text-sm">
                {activity.details.success ? "Yes" : "No"}
              </span>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toLocaleDateString();

    if (dateString === today) {
      return "Today";
    } else if (dateString === yesterdayString) {
      return "Yesterday";
    } else {
      return dateString;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-xl font-semibold">Activity Log</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <IonSpinner name="crescent" />
            <p className="mt-2 text-medium">Loading activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <IonText color="medium">
              <h2 className="text-xl font-medium mb-2">No activities yet</h2>
              <p className="mb-4">
                Start tracking your pet&apos;s activities by adding your first
                entry.
              </p>
            </IonText>
            <IonButton
              onClick={() => history.push("/add-activity")}
              className="mx-auto"
            >
              Add First Activity
            </IonButton>
          </div>
        ) : (
          <IonList className="p-2">
            {Object.keys(groupedActivities).map((date) => (
              <IonItemGroup key={date}>
                <IonItemDivider sticky className="bg-light py-2">
                  <IonLabel className="text-lg font-medium">
                    {formatDate(date)}
                  </IonLabel>
                </IonItemDivider>

                {groupedActivities[date].map((activity) => (
                  <IonItem
                    key={activity.id}
                    className="my-2 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center w-full">
                      <div className="mr-3">
                        <div
                          className={`bg-${getActivityColor(
                            activity.type
                          )} rounded-full p-2 flex items-center justify-center`}
                        >
                          <IonIcon
                            icon={getActivityIcon(activity.type)}
                            className="text-white text-lg"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium capitalize">
                            {activity.type === "potty"
                              ? "Potty Break"
                              : activity.type === "walk"
                              ? "Walk/Exercise"
                              : activity.type}
                          </h3>
                          <IonBadge
                            color={getActivityColor(activity.type)}
                            className="px-2 py-1"
                          >
                            {formatTime(activity.timestamp)}
                          </IonBadge>
                        </div>
                        <div className="mt-1">
                          {renderActivityDetails(activity)}
                        </div>
                      </div>
                    </div>
                  </IonItem>
                ))}
              </IonItemGroup>
            ))}
          </IonList>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push("/add-activity")}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ActivityLogPage;
