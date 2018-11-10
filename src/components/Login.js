import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../common/colors";
import Input from "../components/Input";

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  },
  text: {
    alignSelf: "center",
    color: Colors.white,
    fontFamily: "System",
    fontSize: 16
  },
  touchable: {
    backgroundColor: Colors.blue,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    margin: 5
  }
});

export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
    code: ""
  };

  onPress = () => {
    const { username, password, code } = this.state;
    this.props.onSubmit(username, password, code);
  };

  render = () => (
    <View style={styles.inputView}>
      <Input
        selectTextOnFocus={true}
        placeholder={"Username"}
        onChangeText={username => this.setState({ username })}
      />
      <Input
        selectTextOnFocus={true}
        placeholder={"Password"}
        onChangeText={password => this.setState({ password })}
        secureTextEntry
      />
      {this.props.requires2FA && (
        <Input
          selectTextOnFocus={true}
          placeholder={"2FA Code"}
          onChangeText={code => this.setState({ code })}
        />
      )}
      <TouchableOpacity style={styles.touchable} onPress={this.onPress}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}