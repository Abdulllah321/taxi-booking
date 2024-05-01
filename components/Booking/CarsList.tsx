import economy from "@/public/images/economy.jpeg"
import standard from "@/public/images/standard.jpeg"
import luxury from "@/public/images/luxury.jpeg"
import motorcycle from "@/public/images/motor.png"
const rideTypes = [
  {
    id: 1,
    name: "Economy",
    image: economy,
    charges: 1
  },
  {
    id: 2,
    name: "Standard",
    image: standard,
    charges: 1.5
  },
  {
    id: 3,
    name: "Luxury",
    image: luxury,
    charges: 2
  },
  {
    id: 4,
    name: "Motorcycle",
    image: motorcycle,
    charges: 0.5
  },
];

export default rideTypes;
