import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { DarkText } from "./Texts/Text";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

const DropdownComponent = ({
  label,
  placeholder,
  data,
  selectedValue,
  setSelectedValue,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const [MediumLoaded, RegularLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  if (!MediumLoaded && !RegularLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <DarkText>{label}</DarkText>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#EAB008" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.itemContainerStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        search={false}
        activeColor="#EAB008"
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={selectedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelectedValue(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <FontAwesomeIcon
            icon={faChevronDown}
            size={20}
            color={isFocus ? "#EAB008" : "#D3D7D8"}
          />
        )}
        renderItem={(item, selected) => (
          <View
            style={[
              styles.itemContainerStyle,
              selected && { backgroundColor: "#EAB008" },
            ]}
          >
            <Text
              style={[styles.itemTextStyle, selected && { color: "#4C5456" }]}
            >
              {item.label}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // borderWidth: 1,
    // borderColor: "#EAB008",
    // borderStyle: "solid",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#D3D7D8",
    borderStyle: "solid",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#C0C5C7",
    fontFamily: "Montserrat_500Medium",
    height: 24,
    lineHeight: 24,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
    height: 24,
    lineHeight: 24,
    color: "#C0C5C7",
  },
  containerStyle: {
    borderRadius: 8,
    height: 240,
    marginTop: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 250,
  },
  itemContainerStyle: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  itemTextStyle: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
    color: "#C0C5C7",
  },
});

// import { View, TouchableWithoutFeedback } from "react-native";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { DarkText } from "./Texts/Text";
// import styled from "styled-components";
// import { SelectList } from "react-native-dropdown-select-list";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { Dropdown } from "react-native-element-dropdown";

// import {
//   useFonts,
//   Montserrat_500Medium,
//   Montserrat_400Regular,
// } from "@expo-google-fonts/montserrat";

// const SelectContainer = styled(View)`
//   width: 100%;
// `;

// const SelectWrapper = styled(View)`
//   gap: 12px;
// `;

// const DropdownComponent = ({
//   label,
//   placeholder,
//   isFocused,
//   onBlur,
//   onFocus,
// }) => {
//   const [statesData, setStatesData] = useState([]);
//   const [selectedState, setSelectedState] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const url = "https://jsonplaceholder.typicode.com/posts";

//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const response = await axios.get(url);
//         setStatesData(
//           response.data.map((states) => {
//             return { key: states.id, value: states.id };
//           })
//         );
//       } catch (error) {
//         console.error("Error fetching states:", error);
//       }
//     };

//     fetchStates();
//   }, []);

//   const [MediumLoaded, RegularLoaded] = useFonts({
//     Montserrat_400Regular,
//     Montserrat_500Medium,
//   });

//   if (!MediumLoaded && !RegularLoaded) {
//     return null;
//   }

//   return (
//     <SelectContainer>
//       <SelectWrapper>
//         <DarkText>{label}</DarkText>

//         <SelectList
//           data={statesData}
//           setSelected={(val) => setSelectedState(val)}
//           onSelect={() => {
//             onBlur();
//             alert(selectedState);
//           }}
//           save="value"
//           placeholder={placeholder}
//           search={false}
//           dropdownShown={false}
//           arrowicon={
//             <FontAwesomeIcon
//               icon={faChevronDown}
//               size={20}
//               color={isFocused ? "#EAB008" : "#D3D7D8"}
//             />
//           }
//           dropdownStyles={{
//             height: 240,
//             borderColor: "transparent",
//             borderRadius: 8,
//             backgroundColor: "white",
//             shadowColor: "#000000",
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 1,
//             shadowRadius: 36,
//             elevation: 300,
//           }}
//           dropdownItemStyles={{
//             paddingHorizontal: 12,
//             paddingVertical: 18,
//           }}
//           dropdownTextStyles={{
//             fontFamily: "Montserrat_400Regular",
//             fontSize: 16,
//             lineHeight: 24,
//             color: "#4C5456",
//           }}
//           boxStyles={
//             ([],
//             {
//               borderRadius: 8,
//               borderWidth: 1,
//               borderColor: isFocused ? "#EAB008" : "#D3D7D8",
//               height: 56,
//               paddingHorizontal: 24,
//               paddingVertical: 16,
//             })
//           }
//           inputStyles={{
//             color: "#C0C5C7",
//             fontSize: 16,
//             fontFamily: "Montserrat_500Medium",
//             lineHeight: 24,
//             height: 24,
//           }}
//         />
//       </SelectWrapper>
//     </SelectContainer>
//   );
// };

// export default DropdownComponent;
