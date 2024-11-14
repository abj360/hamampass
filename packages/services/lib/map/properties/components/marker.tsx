import { Feature } from "ol";
import { Point } from "ol/geom";
import { Icon, Style } from "ol/style";
import { fromLonLat } from "ol/proj";
import { generateIconSvg } from "../utils";
import { TProperty } from "@hamampass/db/types";

const CreateMarker = ({
  property,
  markerLayer,
}: {
  property: TProperty;
  markerLayer: any;
}) => {
  const { location } = property.contact;
  if (location) {
    const markerFeature = new Feature({
      geometry: new Point(fromLonLat([location[1], location[0]])),
    });

    markerFeature.setProperties({
      isActive: false,
      title: property.title,
      sex: property.sex,
      price: property.products[0].adult_price,
    });

    markerFeature.setStyle(
      new Style({
        image: new Icon({
          src: generateIconSvg({
            content: property.products[0].adult_price,
            isActive: false, // Set initial state as inactive
          }),
          scale: 1,
        }),
      })
    );

    markerLayer.getSource()?.addFeature(markerFeature);
  }
};

export { CreateMarker };
