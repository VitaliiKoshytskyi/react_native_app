import {Text,View,TextInput,StyleSheet,TouchableOpacity,Keyboard,TouchableWithoutFeedback,Platform,KeyboardAvoidingView,} from "react-native";

export default function LoginScreen() {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.innerBox} behavior={Platform.OS === "ios" ? "padding" : "height"} >
          <View style={styles.registraionWrapper}>
            <View style={styles.registraionBox}>
              <Text style={styles.text}>Увійти</Text>
              <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Адреса електронної пошти"/>
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
          <Text style={styles.signinText}> Немає акаунту?{" "}
            <Text style={[styles.signinText, styles.signinLink]}>
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
  innerBox: {
    flex: 1,
  },

  registraionWrapper: {
    flex: 1,
    justifyContent: "flex-end",
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
  registraionBox: {
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
  signinText: {
    marginBottom: 111,
    color: "#1B4371",
    fontFamily: "Roboto-regular",
    fontSize: 16,
    lineHeight: 19,
  },
  signinLink: { textDecorationLine: "underline" },
});
