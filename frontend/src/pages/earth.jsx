import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { API_KEY } from "../constants";
import { compareAsc, format } from "date-fns";
import { Image, Slider, DatePicker, Skeleton } from "@nextui-org/react";
import Container from "../components/common/container";
import Video from "../components/common/video";
import Loading from "../components/common/loading";

const Earth = () => {
  const [value, setValue] = useState(parseDate("2018-01-01"));
  const [longitude, setLongitude] = useState(0);
  const [longValue, onChangeLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [latValue, onChangeLatitude] = useState(0);
  const { data, loading, reFetch } = useFetch(
    `https://api.nasa.gov/planetary/earth/assets?lon=${longitude}&lat=${latitude}&date=${format(
      new Date(value),
      "yyyy-MM-dd"
    )}&api_key=${API_KEY}`
  );

  console.log(data);

  useEffect(() => {
    console.log(format(new Date(value), "yyyy-MM-dd"));
  }, [value]);

  useEffect(() => {
    reFetch();
  }, [longitude, latitude]);

  const setLongitudeValue = (value) => {
    setLongitude(value);
  };
  const setLatitudeValue = (value) => {
    setLatitude(value);
  };

  return (
    <Container>
      <div className="absolute min-[1700px]:top-[-470px] md:top-[-370px] top-[-120px] left-0">
        <div className="h-[300px] w-full bg-gradient-to-t from-black absolute bottom-0 left-0 z-[1]"></div>
        <Video />
      </div>
      <div className="flex flex-col flex-1 items-center w-full z-10 md:flex-row gap-10">
        {loading ? (
          <Loading />
        ) : (
          <div className="md:w-1/2 w-full flex justify-center h-[500px] md:perspective-1600 ">
            <Skeleton
              isLoaded={!loading}
              className="rounded-lg h-full md:[transform:rotateY(30deg)] w-full"
            >
              <Image
                removeWrapper
                className=" h-full w-full object-cover md:[transform:rotateY(30deg)]"
                src={data.url}
                alt="Image"
              />
              {!data && (
                <div className="rounded-lg h-full w-full">
                  <h1>No imagery for specified date!</h1>
                </div>
              )}
            </Skeleton>
          </div>
        )}

        <div className="w-full md:w-1/2 md:h-[500px] md:gap-0 rounded-lg md:perspective-1600">
          <div className="backdrop-blur-sm md:p-4 md:[transform:rotateY(-30deg)] group transition-transform">
            <div>
              <DatePicker
                data-testid="Date"
                label="Date"
                labelPlacement="outside"
                // className="max-w-md"
                description={
                  "Beginning of 30 day date range that will be used to look for closest image to that date."
                }
                value={value}
                onChange={setValue}
                variant="underlined"
                className=" text-black"
              />
            </div>

            <div>
              <Slider
                data-testid="Longitude"
                orientation="horizontal"
                label="Longitude"
                size="sm"
                color="secondary"
                step={10}
                showSteps
                maxValue={100}
                minValue={-100}
                fillOffset={0}
                defaultValue={1.5}
                className=" mt-6"
                formatOptions={{ signDisplay: "always" }}
                onChangeEnd={setLongitudeValue}
                onChange={onChangeLongitude}
                value={longValue}
                classNames={{
                  filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
                }}
              />

              <Slider
                data-testid="Latitude"
                orientation="horizontal"
                label="Latitude"
                size="sm"
                color="secondary"
                step={10}
                showSteps
                maxValue={100}
                minValue={-100}
                fillOffset={0}
                defaultValue={1.5}
                className=" mt-6"
                formatOptions={{ signDisplay: "always" }}
                onChange={onChangeLatitude}
                onChangeEnd={setLatitudeValue}
                value={latValue}
                classNames={{
                  filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Earth;
