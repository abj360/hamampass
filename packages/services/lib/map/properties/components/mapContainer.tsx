import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat } from "ol/proj";

const CreateMap = (mapRef: any) => {
  const initialCenter = fromLonLat([28.954795, 40.996182]);

  const map = new Map({
    target: mapRef?.current || undefined,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: initialCenter,
      zoom: 13,
    }),
    controls: defaultControls({
      zoom: false,
      rotate: false,
      attribution: false,
    }),
  });

  return map;
};

export { CreateMap };
