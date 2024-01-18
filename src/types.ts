import { ReactNode, SetStateAction, Dispatch } from 'react';

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
  formatted_address: string;
}

export interface SuggestionsMapProps {
  lat: string;
  lng: string;
  places: Place[];
}

export interface SuggestionsListProps {
  places: Place[];
  placesCoords: string[];
  finalCoordsOrigins: Coord[];
  transportation: string;
  userCoord: Coord;
  friendCoord: Coord;
  timeStamp: TimeStamp;
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

export interface TimeStamp {
  date: string;
  time: string;
  day: {
    weekdayTextIndex: number;
    periodsDayIndex: number;
    dayIndex: number;
    dayName: string;
  };
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
  timeStamp: TimeStamp;
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

export interface UserType {
  id: string;
  username: string;
  imgUrl: string;
}

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
    name: string;
    rating: number;
    geometry: {
      location: {
        lat: any;
        lng: any;
      };
    };
    current_opening_hours: {
      weekday_text: string[];
    };
  };
  travelDetails: TravelDetails[];
}

export interface TravelDetails {
  origin: string;
  travelTime: string;
  travelDistance: string;
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

export interface UserType {
  id: string;
  username: string;
  imgUrl: string;
}

export interface Crosshair {
  midpoint: Coord;
  posNorth: Coord;
  posEast: Coord;
  posSouth: Coord;
  posWest: Coord;
}

export interface ConfirmedProps {
  chosenMeeting: ChosenMeeting;
  timeStamp: TimeStamp;
  foundUser: Users[];
  transportation: string;
}