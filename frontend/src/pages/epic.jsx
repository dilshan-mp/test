import { parseDate } from "@internationalized/date";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem, Pagination } from "@nextui-org/react";
import { API_KEY } from "../constants";
import useFetch from "../hooks/useFetch";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  DatePicker,
  Image,
} from "@nextui-org/react";
import Container from "../components/common/container";
import Loading from "../components/common/loading";

const cameras = [
  { label: "Front Hazard Avoidance Camera", value: "fhaz" },
  { label: "Rear Hazard Avoidance Camera", value: "rhaz" },
  { label: "Navigation Camera", value: "navcam" },
  { label: "Mast Camera", value: "mast" },
];

const Epic = () => {
  const [camera, setCamera] = useState("mast");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this value as per your requirement
  const [dataList, setDataList] = useState([]);

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    dataList && dataList.slice(indexOfFirstItem, indexOfLastItem);

  const { data, loading, reFetch } = useFetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${camera}&api_key=${API_KEY}`
  );

  console.log(data.photos);

  useEffect(() => {
    setDataList(data.photos);
  }, [data.photos]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <div className="grid grid-cols-3 gap-4 w-full mb-10">
            <Autocomplete
              variant="underlined"
              label="Cameras"
              labelPlacement="outside"
              defaultSelectedKey={cameras[0]}
              placeholder="Search a camera"
              className="dark"
              onSelectionChange={(e) => setCamera(e)}
            >
              {cameras.map((camera) => (
                <AutocompleteItem key={camera.value} value={camera.value}>
                  {camera.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {currentItems &&
              currentItems.map((object) => (
                <Card isFooterBlurred className="h-[300px]">
                  <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                      {object.rover.landing_date}
                    </p>
                    <h4 className="text-white/90 font-medium text-xl">
                      Your checklist for better sleep
                    </h4>
                  </CardHeader>
                  <img
                    // removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-full h-full object-cover"
                    src={object.img_src}
                  />
                  <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                      <Image
                        alt="Breathing app icon"
                        className="rounded-full w-10 h-11 bg-black"
                        src={object.img_src}
                      />
                      <div className="flex flex-col">
                        <p className="text-tiny text-white/60">Breathing App</p>
                        <p className="text-tiny text-white/60">
                          Get a good night's sleep.
                        </p>
                      </div>
                    </div>
                    <Button radius="full" size="sm">
                      Get App
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
          {dataList && (
            <div className="grid place-items-center p-4">
              <Pagination
                showControls
                total={Math.ceil(dataList.length / 10)}
                initialPage={1}
                isCompact
                onChange={(pageNumber) => setPage(pageNumber)}
              />
            </div>
          )}
        </Container>
      )}
    </>
  );
};

export default Epic;
