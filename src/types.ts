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
  img_url: string;
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
  friendCoord: Coord;
  userCoord: Coord;
};

export type InvitationsProps = {
  invites: Invite[];
  setSubmitted: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
};

export interface InviteUserProps {
  chosenMeeting: ChosenMeeting;
  transportation: string;
  userCoord: Location;
  friendCoord: Location;
  timeStamp: MeetingTime;
}

export interface InviteFormProps {
  chosenMeeting: ChosenMeeting;
  transportation: string;
  userCoord: Location;
  friendCoord: Location;
  timeStamp: MeetingTime;
  setHasClicked: React.Dispatch<React.SetStateAction<boolean>>;
  foundUser: Users[];
  setFoundUser: any;
}

export interface UserContextType {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

export interface User {
  id: string | undefined;
  username: string | undefined;
  img_url: string | undefined;
}

export interface UserProviderProps {
  children: ReactNode;
}

export interface ChosenMeeting {
  address: string;
  placeData: {
    data: {
      result: {
        name: string;
        rating: number;
        geometry: {
          location: {
            lat: number;
            lng: number;
          };
        };
        current_opening_hours: {
          weekday_text: string[];
        };
      };
    };
  };
  travelDetails: TravelDetails[];
}

export interface TravelDetails {
  origin: string;
  travelTime: string;
  travelDistance: string;
}

export interface TimeStamp {
  day: {
    weekdayTextIndex: number;
  };
}

export interface Coord {
  lat: number;
  lng: number;
}

export interface PostItineraryParams {
  invitee: Users;
  user: User;
  friendCoord: Coord;
  userCoord: Coord;
  transportation: string;
  chosenMeeting: ChosenMeeting;
  timeStamp: TimeStamp;
}
