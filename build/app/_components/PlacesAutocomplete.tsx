import usePlacesAutocomplete from "use-places-autocomplete";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

export const PlacesAutocomplete = ({
  onAddressSelect,
  selectState,
  setSelectState,
  disabled,
}: {
  onAddressSelect?: (address: string) => void;
  selectState: boolean;
  setSelectState: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "us" },
      types: ["(cities)"],
    },
    debounce: 300,
    cache: 86400,
  });

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;

      return (
        <li
          className="bg-white border-gray-300 hover:cursor-pointer hover:bg-gray-100 p-2"
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            if (onAddressSelect) {
              onAddressSelect(description);
            }
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  return (
    <div className="relative">
      <div>
        <Input
          value={value}
          disabled={!ready || selectState || disabled}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search Location"
        />
      </div>
      {status === "OK" && (
        <ul className="absolute z-10 mt-1 border-2 rounded border-gray-200 bg-white w-full">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};
