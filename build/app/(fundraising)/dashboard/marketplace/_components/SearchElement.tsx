"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, MapPin, Search, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlacesAutocomplete } from "@/app/_components/PlacesAutocomplete";
import { useRouter } from "next/navigation";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Badge } from "@/components/ui/badge";
import { revalidatePath } from "next/cache";
function SearchElements({
  localNameParam,
  radiusParam,
}: {
  localNameParam: string | null;
  radiusParam: string | undefined;
}) {
  const router = useRouter();
  const [select, setSelect] = useState(false);
  const [locationChoice, setLocationChoice] = useState("");

  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [radius, setRadius] = useState<number | null>(null);
  const [localName, setLocalName] = useState<string | null>(null);
  const [openLocal, setOpenLocal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    const currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("term", searchTerm);
    router.push("/dashboard/marketplace?" + currentUrlParams.toString());
  };
  console.log(radiusParam);
  return (
    <>
      <div className="flex">
        {" "}
        <Input
          className="rounded-tr-none rounded-br-none w-80"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button
          className="rounded-tl-none rounded-bl-none bg-black hover:bg-gray-800"
          onClick={handleSearch}
        >
          <Search className="h-4 w-4" />
        </Button>
        <Popover open={openLocal} onOpenChange={setOpenLocal}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="ml-6"
              onClick={() => {
                setOpenLocal(true);
              }}
            >
              <MapPin className="w-4 h-4 mr-2" /> Location
            </Button>
          </PopoverTrigger>
          <PopoverContent className="px-8 py-6 max-w-72">
            <RadioGroup className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="remote"
                  onClick={() => setLocationChoice("remote")}
                  checked={locationChoice === "remote"}
                  id="remote"
                />
                <Label htmlFor="remote">Remote</Label>
              </div>
              <div className="">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem
                    value="custom"
                    id="custom"
                    onClick={() => setLocationChoice("custom")}
                    checked={locationChoice === "custom"}
                  />
                  <Label htmlFor="custom">Custom</Label>
                </div>
                <div className="mt-2 flex ">
                  <div>
                    <PlacesAutocomplete
                      disabled={!(locationChoice === "custom" || select)}
                      selectState={select}
                      setSelectState={setSelect}
                      onAddressSelect={(address) => {
                        getGeocode({ address: address }).then((results) => {
                          const { lat, lng } = getLatLng(results[0]);
                          setLat(lat);
                          setLong(lng);
                          setLocalName(address);
                          setSelect(true);
                        });
                      }}
                    />
                  </div>
                  {select && (
                    <X
                      className="m-2 hover:cursor-pointer"
                      onClick={() => {
                        setSelect(false);
                        setLat(null);
                        setLong(null);
                        setLocalName(null);
                      }}
                    />
                  )}
                </div>
                <div className="mt-2">
                  <Select
                    disabled={!(locationChoice === "custom")}
                    onValueChange={(value) => {
                      setRadius(parseInt(value));
                    }}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Mile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Miles</SelectLabel>
                        <SelectItem
                          onClick={() => {
                            setRadius(50);
                          }}
                          value="25"
                        >
                          25 mi
                        </SelectItem>
                        <SelectItem
                          onClick={() => {
                            setRadius(50);
                          }}
                          value="50"
                        >
                          50 mi
                        </SelectItem>
                        <SelectItem
                          onClick={() => {
                            setRadius(100);
                          }}
                          value="100"
                        >
                          100 mi
                        </SelectItem>
                        <SelectItem
                          onSelect={() => {
                            setRadius(250);
                          }}
                          value="250"
                        >
                          250 mi
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </RadioGroup>
            <Button
              className="bg-black mt-2 hover:bg-gray-800"
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                if (locationChoice === "remote") {
                  params.set("radius", "remote");
                  router.push("/dashboard/marketplace?" + params.toString());
                  setRadius(null);
                  setLocationChoice("");
                  setLat(null);
                  setLong(null);
                  setLocalName(null);
                  setSelect(false);
                  setOpenLocal(false);
                } else {
                  params.set("lat", lat?.toString() ?? "");
                  params.set("long", long?.toString() ?? "");
                  params.set("localName", localName?.toString() ?? "");
                  params.set("radius", radius?.toString() ?? "25");
                  router.push("/dashboard/marketplace?" + params.toString());
                  setRadius(null);
                  setLocationChoice("");
                  setLat(null);
                  setLong(null);
                  setLocalName(null);
                  setSelect(false);
                  setOpenLocal(false);
                }
              }}
            >
              Apply
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <div className="pb-2 flex space-x-4 mt-4">
        {radiusParam && radiusParam != "remote" && (
          <Badge
            className="bg-black hover:bg-gray-800 hover:cursor-pointer rounded-xl"
            onClick={() => {
              const params = new URLSearchParams(window.location.search);
              params.delete("lat");
              params.delete("long");
              params.delete("radius");
              params.delete("localName");

              router.push("/dashboard/marketplace?" + params.toString());
            }}
          >
            {localNameParam} : {radiusParam} miles
            <X className="p-1" />
          </Badge>
        )}
        {radiusParam === "remote" && (
          <Badge
            className="bg-black hover:bg-gray-800 hover:cursor-pointer"
            onClick={() => {
              const params = new URLSearchParams(window.location.search);
              params.delete("radius");
              router.push("/dashboard/marketplace?" + params.toString());
            }}
          >
            Remote
            <X className="p-1" />
          </Badge>
        )}
      </div>
    </>
  );
}

export default SearchElements;
