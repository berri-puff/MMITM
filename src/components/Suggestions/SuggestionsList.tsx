import { SuggestionsListProps } from "../../types";

export const SuggestionsList: React.FC<SuggestionsListProps> = ({ places }) => {
  return (
    <ul>
      {places.map((place) => {
        return (
          <li key={place.place_id} className="suggested-place">
            <h3>{place.name}</h3>
            <p>Rating: {place.rating}/5</p>
            <p># of Ratings: {place.user_ratings_total}</p>
            <p>Address: {place.vicinity}</p>
          </li>
        );
      })}
    </ul>
  );
};
