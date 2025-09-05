import { CardSettings } from "./card-settings";

export const defaultColours: CardSettings = {
  keywordColour: "#b87f47",
  baseColours: {
    primaryColour: {
      baseColour: "#000000"
    },
    backgroundColour: "#ffffff",
    onBackgroundTextColour: "primaryColour",
    onAttenuatedPrimaryTextColour: "primaryColour",
    onPrimaryTextColour: "backgroundColour"
  },
  cardTypeSettings: {
    "main action": { primaryColour: {baseColour: "#367F36"}},
    "maneuver": { primaryColour: {baseColour: "#365B7F"}},
    "triggered action": { primaryColour: {baseColour: "#7F3636"}},
    "move action": { primaryColour: {baseColour: "#7F5A36"}},
    "free triggered action": { primaryColour: {baseColour: "#7f367f"}},
    "free maneuver": { primaryColour: {baseColour: "#367F5A"}},
    "no action": { primaryColour: {baseColour: "#36367F"}},
    "free strike": { primaryColour: {baseColour: "#595959"}},
    "trait": { primaryColour: {baseColour: "#5a367f"}},
    "treasure": { primaryColour: {baseColour: "#333333"}}
  }
}
