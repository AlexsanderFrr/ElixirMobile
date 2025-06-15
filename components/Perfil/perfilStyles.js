// styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
    justifyContent: "center",
  },
  textMain: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  text: {
    color: "#000000",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginHorizontal: 30,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#000000",
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#BB5104",
    position: "absolute",
    top: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FF89",
    position: "absolute",
    bottom: 18,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#BB5104",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 2,
    width: "100%",
    backgroundColor: "#000000",
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  groupOption: {
    paddingVertical: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default styles;
