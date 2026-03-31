import type { Run } from "../types/runs.types";
import { icons } from "../components/icons/icons";
import { ReactNode } from "react";

const {
  sunny: SunnyIcon,
  partlyCloudy: PartlyCloudyIcon,
  cloudy: CloudyIcon,
  rain: RainIcon,
  snow: SnowIcon,
  windy: WindyIcon,
  hot: HotIcon,
  cold: ColdIcon,
} = icons;

const weatherDict = {
  sunny: <SunnyIcon />,
  partly_cloudy: <PartlyCloudyIcon />,
  cloudy: <CloudyIcon />,
  rain: <RainIcon />,
  snow: <SnowIcon />,
  windy: <WindyIcon />,
  hot: <HotIcon />,
  cold: <ColdIcon />,
};

function getWeatherIcon(key: NonNullable<Run["weather"]>): ReactNode {
  return weatherDict[key];
}

export { getWeatherIcon };
