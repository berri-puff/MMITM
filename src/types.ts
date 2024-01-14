import { ReactNode, SetStateAction, Dispatch } from "react";

export interface Attendee {
  username: string;
  transportation: string;
  travel_time: string;
  accepted: boolean;
  start_location: Location;
}

export interface Venue {
  name: string;
  type: string;
  location: string;
  rating: string;
  opening_hours: string;
  coordinates: Location;
}

export interface Invite {
  id: string;
  attendees: {
    meeting_creator: Attendee;
    invitee_1: Attendee;
  };
  venue: Venue;
  meeting_time: MeetingTime;
}

export interface MeetingTime {
  date: string;
  day: Day;
  time: string;
}

export interface Day {
  dayIndex: number;
  dayName: string;
  periodsDayIndex: number;
  weekdayTextIndex: number;
}

export interface Place {
  geometry: Geometry;
  name: string;
  place_id: string;
  rating: number;
  user_ratings_total: number;
  vicinity: string;
}

export interface SuggestionsMapProps {
  lat: string;
  lng: string;
  places: Place[];
}

export interface SuggestionsListProps {
  places: Place[];
}

export interface Geometry {
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Users {
  id: string;
  first_name: string;
  preferences: string[];
  username: string;
}
export type SuggestionsProps = {
  friendCoord: {
    lat: number;
    lng: number;
  };
  userCoord: {
    lat: number;
    lng: number;
  };
  transportation: string;
};
export type MeetingMapProps = {
  friendCoord: {
    lat: number;
    lng: number;
  };
  userCoord: {
    lat: number;
    lng: number;
  };
};

export type CrosshairProps = {
  friendCoord: {
    lat: number;
    lng: number;
  };
  userCoord: {
    lat: number;
    lng: number;
  };
};

export type InvitationsProps = {
  invites: Invite[];
  setSubmitted: React.Dispatch<React.SetStateAction<string>>;
};

export interface InviteUserProps {
  chosenMeeting: Place;
  transportation: string;
  userCoord: Location;
  friendCoord: Location;
  timeStamp: MeetingTime;
}

export interface InviteFormProps {
  chosenMeeting: Place;
  transportation: string;
  userCoord: Location;
  friendCoord: Location;
  timeStamp: MeetingTime;
  setHasClicked: React.Dispatch<React.SetStateAction<boolean>>;
  foundUser: Users[];
  setFoundUser: Users[];
}

export interface UserContextType {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

export interface User {
  user: string | undefined;
  username: string | undefined;
}

export interface UserProviderProps {
  children: ReactNode;
}
