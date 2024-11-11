import dotenv from "dotenv";
dotenv.config();

import { request } from "./lib/axios";
import { MapComponent } from "./lib/map";
import { PropertiesMapComponent } from "./lib/map/properties";

export { request, MapComponent, PropertiesMapComponent };
