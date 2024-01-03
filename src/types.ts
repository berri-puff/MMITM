export interface Attendee {
  username: string;
  transportation: string;
  travel_time: string;
  accepted: boolean;
}

export interface Venue {
  name: string;
  type: string;
  location: string;
  rating: string;
}

export interface Invite {
  id: string;
  attendees: {
    meeting_creator: Attendee;
    invitee_1: Attendee;
  };
  venue: Venue;
  meeting_time: number;
}

export interface Coordinates {
  lat: number,
  lng: number
}

export interface Users {
  id: string 
  first_name : string,
  preferences : string[],
  username: string
}
