import 'react-native-gesture-handler';
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { Main } from "./Components/Main";

export default function App() {

  const [fontLoaded] = useFonts({
    "Roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-bolt": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  if (!fontLoaded) {
    return null;
  }
   return (
     <Provider store={store}>
     <Main/>
     </Provider>
  )
}


