import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo_login: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 70,
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
    width: "80%",
  },
  login__input: {
    backgroundColor: "#FFB100",
    width: "100%",
    height: 50,
    fontSize: 19,
    padding: 7,
    marginBottom: 15,
    borderRadius: 10,
  },
  login__button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#BB5104",
    alignSelf: "center",
    borderRadius: 10,
  },
  login__buttonText: {
    fontWeight: "600",
    fontSize: 22,
    color: "#F5F5F5",
  },
});
export default styles;
