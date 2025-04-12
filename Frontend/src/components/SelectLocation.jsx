import React, { useState } from "react";

function SelectLocation({ inputs, setInputs }) {
  const stateCityData = {
    "Andhra Pradesh": [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Nellore",
      "Tirupati",
    ],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat"],
    Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Korba"],
    Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    Haryana: ["Gurgaon", "Faridabad", "Panipat", "Ambala"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Manipur: ["Imphal", "Bishnupur", "Thoubal", "Churachandpur"],
    Meghalaya: ["Shillong", "Tura", "Jowai", "Nongpoh"],
    Mizoram: ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Wokha"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"],
    Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
    Sikkim: ["Gangtok", "Pelling", "Namchi", "Gyalshing"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
    Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
    Uttarakhand: ["Dehradun", "Haridwar", "Nainital", "Rishikesh"],
    "West Bengal": ["Kolkata", "Darjeeling", "Asansol", "Siliguri"],
  };
  const [cities, setCities] = useState([]);
  const handleStateChange = (e) => {
    setInputs({ ...inputs, state: e.target.value, city: "" });
    setCities(stateCityData[e.target.value]);
    console.log(inputs);
  };

  const handleCityChange = (e) => {
    setInputs({ ...inputs, city: e.target.value });
  };
  return (
    <>
      <div>
        <select
          className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded bg-white mt-4`}
          id="state"
          value={inputs.state}
          onChange={handleStateChange}
        >
          <option value="">Select State</option>
          {Object.keys(stateCityData).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          id="city"
          value={inputs.city}
          onChange={handleCityChange}
          disabled={!inputs.state}
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded bg-white mt-4"
        >
          <option value="">Select City</option>
          {inputs.state !== "" ? (
            cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
      </div>
      <input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded  mt-4"
        type="text"
        placeholder="Pincode"
        value={inputs.pincode}
        onChange={(e) => setInputs({ ...inputs, pincode: e.target.value })}
      />
    </>
  );
}

export default SelectLocation;
