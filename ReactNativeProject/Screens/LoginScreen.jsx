import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

export default function LoginScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.registraion_wrapper}>
            <View style={styles.registraion_box}>
              <Text style={styles.text}>Увійти</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Адреса електронної пошти"
                />
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Пароль" />
                <TouchableOpacity style={styles.hideBtn}>
                  <Text style={styles.hideText}>Показати</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.box}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Увійти</Text>
          </TouchableOpacity>
          <Text style={styles.signin_text}>
            Немає акаунту?{" "}
            <Text style={[styles.signin_text, styles.signin_link]}>
              Зареєструватися
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },

  registraion_wrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  profile_photo: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: 0,
    left: "50%",
    marginLeft: -60,
    marginTop: -60,
  },
  input: {
    minWidth: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontFamily: "Roboto-regular",
    fontSize: 16,
  },
  hideBtn: {
    position: "absolute",
    right: 26,
    bottom: 31,
  },
  hideText: {
    color: "#1B4371",
    fontFamily: "Roboto-regular",
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    top: "65%",
    left: "90%",
  },
  registraion_box: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  text: {
    marginTop: 32,
    marginBottom: 33,
    fontFamily: "Roboto-regular",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#212121",
  },
  btn: {
    minWidth: "100%",
    height: 51,
    marginTop: 27,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto-regular",
    fontSize: 16,
  },
  form: {
    paddingLeft: 16,
    paddingRight: 16,
  },

  marginBottom: {
    marginBottom: 43,
  },
  box: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  btn: {
    width: 343,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  signin_text: {
    marginBottom: 111,
    color: "#1B4371",
    fontFamily: "Roboto-regular",
    fontSize: 16,
    lineHeight: 19,
  },
  signin_link: { textDecorationLine: "underline" },
});
