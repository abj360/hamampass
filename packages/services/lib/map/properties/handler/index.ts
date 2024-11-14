import { generateIconSvg } from "../utils";
import { Icon, Style } from "ol/style";

export const updateMarkerState = ({
  data,
  marker,
  state,
}: {
  data: any;
  marker: any;
  state: boolean;
}) => {
  marker.setStyle(
    new Style({
      image: new Icon({
        src: generateIconSvg({
          content: data.price,
          isActive: state,
        }),
        scale: 1,
      }),
    })
  );
  marker.setProperties({
    isActive: state,
  });
};
