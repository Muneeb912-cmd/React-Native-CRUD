import React from "react";
import { View } from "react-native";
import { Switch ,Text} from "react-native-paper";

const SwitchSettings = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={{ flexDirection: "row",alignItems:"center",justifyContent:"space-between"}}>
      <Text style={{fontSize:16}}>Notifications </Text>
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
    </View>
  );
};

export default SwitchSettings;
