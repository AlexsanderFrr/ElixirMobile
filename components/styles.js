import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
    width: "80%",
  },
  login__input: {
    backgroundColor: "#fff",
    fontSize: 19,
    padding: 7,
    marginBottom: 15,
  },
  login__button: {
    padding: 12,
    backgroundColor: "#F58634",
    alignSelf: "center",
    borderRadius: 5,
  },
  login__buttonText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#333",
  },
});
export default styles;
