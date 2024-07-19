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
  logo_cadastro: {
    justifyContent: "center",
    alignItems: "center",
  },
  whitebg: {
    backgroundColor: "white",
  },
  text_welcome: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 15,
  },
  text_newac: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 15,
  },
  img_logo: {
    width: 256, 
    height: 41
  },
  img_logocad: {
    width: 256, 
    height: 41,
    marginBottom: 40,
  },
  labelError: {
    alignSelf: 'flex-start',
    color: '#eb0909',
    fontWeight: '700',
    marginBottom: 11
  },
  login__form: {
    //flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingTop: 100,
  },
  cad_form: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingBottom: 40,
  },
  login__input: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 50,
    fontSize: 17,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 20,
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
    //marginTop: 40,
  },
  login__buttonText: {
    fontWeight: "500",
    fontSize: 25,
    color: "#F5F5F5",
    fontFamily: "sans-serif",
  },
  cad__input: {
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
  cad__button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#BB5104",
    alignItems: "center",
    borderRadius: 10,
    //marginTop: 40,
  },
  align_Down: {
    alignItems: "center",
    marginTop: 60,
  },
  align_Top: {
    alignItems: "center",
    //marginBottom: 60,
  },
  social_Container: {
    //justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
  },
  social_ContainerCad: {
    //justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 15,
  },
  register_button: {
    marginTop: 30,
  },
  textRegisterAlign: {
    flexDirection: "row"
  },
  register_firstText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#838181",
    marginRight: 5
  },
  register_secondText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#BB5104"
  }
});
export default styles;
