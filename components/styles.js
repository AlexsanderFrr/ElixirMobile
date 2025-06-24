import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerLogin: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 80,
  },
  containerCadastro: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 80,
  },
  logo_login: {
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
    height: 41,
  },
  img_logocad: {
    width: 256,
    height: 41,
    marginBottom: 20,
  },
  labelError: {
    alignSelf: 'flex-start',
    color: '#eb0909',
    fontWeight: '700',
    marginBottom: 11,
  },
  login__form: {
    width: "100%",
    justifyContent: "center",
    marginTop: 40,
  },
  cad_form: {
    width: "100%",
    justifyContent: "center",
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  login__input: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 50,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderWidth: 1.5,
    borderColor: "#FFB100",
    borderRadius: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',  // Alinha o botão à direita
    marginBottom: 20,       // Espaçamento inferior
  },
  forgotPasswordText: {
    fontSize: 18,
    color: '#BB5104',       // Cor do texto (laranja escuro, como os outros elementos)
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  iconStyle: {
    position: 'absolute',
    top: '50%',
    zIndex: 4, //agrupa
    left: 15,
    transform: [{ translateY: -12 }], // Ajuste vertical para centralizar o ícone
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    top: '50%',
    right: 15,
    transform: [{ translateY: -12 }], // Ajuste vertical para centralizar o ícone
  },
  login__button: {
    width: "100%",
    height: 50,
    backgroundColor: "#BB5104",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 12, // Deixa apenas o preenchimento lateral
  },
  login__buttonText: {
    fontWeight: 'bold',
    fontSize: 23,
    color: "#F5F5F5",
    fontFamily: "sans-serif",
  },
  cad__input: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 46,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 13,
    paddingLeft: 48,
    borderWidth: 1.5,
    borderColor: "#FFB100",
    borderRadius: 10,
  },
  cad__button: {
    width: "100%",
    height: 50,
    paddingHorizontal: 12,
    backgroundColor: "#BB5104",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#838181",
  },
  align_Down: {
    alignItems: "center",
    marginTop: 30,
  },
  align_Top: {
    alignItems: "center",
  },
  social_Container: {
    flexDirection: "row",
    marginTop: 15,
  },
  social_ContainerCad: {
    flexDirection: "row",
    marginBottom: 15,
  },
  register_button: {
    marginTop: 10,
  },
  textRegisterAlign: {
    flexDirection: "row",
  },
  register_firstText: {
    fontSize: 16,
    fontWeight: '500',
    color: "#838181",
    marginRight: 5,
  },
  register_secondText: {
    fontSize: 16,
    fontWeight: '500',
    color: "#BB5104",
  },
});

export default styles;
