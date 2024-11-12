"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
} from "@hamampass/ui/primitives/drawer.tsx";
import { useState, useEffect } from "react";
import FilterComponent from "@/components/pages/properties/filters";
import { PropertiesMapComponent } from "@hamampass/services";
import Cards from "@/components/pages/properties/cards";
import { TProperty } from "@hamampass/db/types";
import { useFetchProperties } from "@/hooks/useFetchProperties";
import { useSelector } from "react-redux";
import { request } from "@hamampass/services";

const MapDrawerComponent = ({
  serverProperties,
}: {
  serverProperties?: TProperty[];
}) => {
  const snapPoints = [1 / 14, 1 / 2, 50 / 51];
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  useEffect(() => {
    setSnap(snapPoints[1]);
  }, []);

  useFetchProperties();
  const res = useSelector((state: any) => state.properties.propertyState);

  const [properties, setProperties] = useState<TProperty[]>(
    serverProperties || []
  );
  const [page, setPage] = useState({
    page: 1,
    max_page: 1,
  });

  useEffect(() => {
    setProperties(Array.isArray(res.data) ? res.data : []);

    setPage({
      page: res.page,
      max_page: res.max_page,
    });
  }, [res]);

  const handleLoadMore = async () => {
    try {
      const response = await request({
        type: "get",
        endpoint: "property",
        params: {
          page: page.page + 1,
        },
      });

      setProperties([...properties, ...response.data.data]);

      setPage({
        page: response.data.page,
        max_page: response.data.max_page,
      });
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  return (
    <div>
      <header className="fixed top-0 left-0 w-full bg-black z-[51]">
        <FilterComponent />
      </header>
      <Drawer
        open={true}
        snapPoints={snapPoints}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        modal={false}
        snapToSequentialPoint
      >
        <DrawerContent className="h-full rounded-t-xl">
          <DrawerHeader className="rounded-t-lg flex items-center justify-center h-18 flex-col gap-3">
            <div className="w-14 h-1 bg-gray-400 rounded-xl" />
            <p className="text-sm">2 hamams found</p>
          </DrawerHeader>

          <Cards
            properties={properties}
            page={page}
            handleLoadMore={handleLoadMore}
          />
        </DrawerContent>
      </Drawer>
      <div className="h-svh">
        <PropertiesMapComponent
          properties={[properties[0]]}
          setSnap={setSnap}
        />
      </div>
      {snap === 50 / 51 && (
        <button
          className="fixed bottom-11 left-1/2 transform -translate-x-1/2 z-[51] text-lg bg-primary-10/90 text-white px-4 py-1 rounded-lg"
          onClick={() => setSnap(1 / 14)}
        >
          Map
        </button>
      )}
    </div>
  );
};

export default MapDrawerComponent;
