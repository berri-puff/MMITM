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
  formatted_address: string;
}

// export interface SuggestionsMapProps {
//   lat: string;
//   lng: string;
//   places: Place[];
// }

export interface SuggestionsListProps {
  places: google.maps.places.PlaceResult[];
  placesCoords: (string|undefined)[];
  finalCoordsOrigins: Coord[];
  transportation: string;
  userCoord: Coord;
  friendCoord: Coord;
  timeStamp: TimeStamp;
}

export interface ItineraryViewProps {
  chosenMeeting: ChosenMeeting;
  transportation: string;
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
  setUser: Dispatch<SetStateAction<User | undefined>> | undefined;
}

export interface User {
  id: string | undefined;
  username: string | undefined;
  imgUrl: string | undefined;
}

export interface UserProviderProps {
  children: ReactNode;
}

interface Photo {
  height: number;
  html_attributions: string[];
  width: number;
  getUrl: Function;
}

export interface ChosenMeeting {
  address: string;
  placeData: google.maps.places.PlaceResult
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

export interface ItineraryProps {
  chosenMeeting: ChosenMeeting;
  transportation: String;
  timeStamp: TimeStamp;
}

export interface DistanceData {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  status: string;
}

export interface SortProps {
  difference: number;
  index: number
}

export interface SuggestCardProps {
  destination: DetailedDestination;
  index: number;
  transportation: string;
  setChosenMeeting: React.Dispatch<React.SetStateAction<ChosenMeeting>>;
  timeStamp: MeetingTime
}

 export interface SuggestionsMapProps {
  detailedTravelInfo: DetailedDestination[];
  scrollToCard: Function
 }

//////
//DetailedDestination
//////
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface OpeningPeriod {
  close: {
    day: number;
    time: string;
    date: string;
  };
  open: {
    day: number;
    time: string;
    date: string;
  };
}

interface OpeningHours {
  open_now: boolean;
  periods?: OpeningPeriod[];
  weekday_text?: string[];
}

interface GeometryLocation {
  lat: () => void;
  lng: () => void;
}

interface GeometryDetailed {
  location: GeometryLocation;
  viewport: {
    north: number;
    east: number;
    south: number;
    west: number;
  };
}

interface Photo {
  height: number;
  html_attributions: string[];
  width: number;
}

interface Review {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface PlaceData {
  address_components?: AddressComponent[];
  adr_address?: string;
  business_status?: string;
  current_opening_hours?: OpeningHours;
  formatted_address: string;
  geometry?: GeometryDetailed;
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  name?: string;
  opening_hours?: OpeningHours;
  photos?: Photo[];
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  rating: number;
  reference?: string;
  reviews?: Review[];
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  html_attributions: string[];
  utc_offset_minutes: number;
}

export interface TravelDetail {
  origin: string;
  travelTime: string;
  travelDistance: string;
}

export interface DetailedDestination {
  address: string;
  placeData: google.maps.places.PlaceResult;
  travelDetails: TravelDetail[];
}

export interface DistanceMatrixResponse {
  rows: Array<{
    elements: Array<{
      distance: {
        text: string;
        value: number;
      };
      duration: {
        text: string;
        value: number;
      };
    }>;
  }>;
  originAddresses: string[];
  destinationAddresses: string[];
}

export type MeetingFormProps = {
  setUserCoord:  Dispatch<SetStateAction<Coord>>,
  setFriendCoord: Dispatch<SetStateAction<Coord>>,
  setIsSubmitted: Dispatch<SetStateAction<boolean>>,
  setTransportation: Dispatch<SetStateAction<string>>,
  setTimeStamp: Dispatch<SetStateAction<TimeStamp>>,
  timeStamp: TimeStamp,
}
 

export type PlaceResult = PlaceData