import React from "react";

export default function StopPicker(stop, setStop) {
  return (
    <Picker
      selectedValue={stop}
      onValueChange={(itemValue, itemIndex) => setStop(itemValue)}
    >
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
}
