import React, { useState } from "react";
import DropdownComponent from "../../components/Dropdown";

const DropdownInterests = () => {
  const [selectedValueOne, setSelectedValueOne] = useState(null);
  const [selectedValueTwo, setSelectedValueTwo] = useState(null);

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  const filteredData = data.filter((item) => item.value !== selectedValueOne);

  return (
    <>
      <DropdownComponent
        label="Location 1 (State)"
        placeholder="Lagos - Mainland"
        selectedValue={selectedValueOne}
        setSelectedValue={setSelectedValueOne}
        data={data}
      />
      <DropdownComponent
        label="Location 2 (State)"
        placeholder="Lagos - Island"
        selectedValue={selectedValueTwo}
        setSelectedValue={setSelectedValueTwo}
        data={filteredData}
      />
    </>
  );
};

export default DropdownInterests;

// const [statesData, setStatesData] = useState([]);

// const url = "https://jsonplaceholder.typicode.com/posts";

//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const response = await axios.get(url);
//         setStatesData(
//           response.data.map((states) => {
//             return { label: states.id, value: states.id };
//           })
//         );
//       } catch (error) {
//         console.error("Error fetching states:", error);
//       }
//     };

//     fetchStates();
//   }, []);
