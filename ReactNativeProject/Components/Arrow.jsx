import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export default function LogOut({ color = "#BDBDBD" }) {
  return (
    <TouchableOpacity >
    <AntDesign name="arrowleft" size={24} color="black" />
    </TouchableOpacity>
  );
}