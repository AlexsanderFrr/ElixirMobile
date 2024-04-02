import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  logo_login: {
    //flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  whitebg: {
    backgroundColor: "white",
  },
  login__logomarca: {
    marginBottom: 10,
  },
  login__msg: (text = "none") => ({
    fontWeight: "bold",
    fontSize: 22,
    color: "red",
    display: text,
  }),
  login__form: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingTop: 50,
  },
  login__input: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 50,
    fontSize: 17,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 30,
    borderWidth: 1.5,
    borderColor: "#FFB100",
    borderRadius: 10,
  },
  login__button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#BB5104",
    alignItems: "center",
    borderRadius: 10,
  },
  login__buttonText: {
    fontWeight: "500",
    fontSize: 25,
    color: "#F5F5F5",
    fontFamily: "Lora",
  },
  register_button: {

  },
  social_Container: {
    flexDirection: "row"
  }
});
export default styles;
