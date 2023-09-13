import { React, Fragment, useState , useEffect} from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import SearchButton from "./SearchButton";
import ShowCard from "./ShowCard";
import NoResultsFound from "./NoResult";
import './search.css'

const people = [
  { id: 1, name: "Management consulting" },
  { id: 2, name: "IT Consulting" },
  { id: 3, name: "Financial Consulting" },
  { id: 4, name: "Human Resources (HR) Consulting" },
  { id: 5, name: "Marketing and Advertising Consulting" },
  { id: 6, name: "Healthcare Consulting" },
  { id: 7, name: "Environmental and Sustainability Consulting" },
  { id: 8, name: "Engineering Consulting" },
  { id: 9, name: "Legal Consulting" },
  { id: 10, name: "Real Estate Consulting" },
];

export default function Example(props) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");
  const [dateSelected, setDateSelected] = useState("");
  // setDateSelected(props.date);

  useEffect(() => {
    fetchData();
  }, [selected]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/getDoctorDetails/${selected.name}/${props.date}`);
      const json = await response.json();
      setData(json)
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const clickHandler = () => {
    setFilteredData(data.filter((doc) =>  {
      return doc.specialty === selected.name
    }))
    setShow(true);
    console.log(filteredData)
    fetchData();
  }

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  return (
    <div>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-14 z-1">
          <div className=" z-1 relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className=" z-2 w-full border-none py-4 pl-3 pr-10 text-lg leading-5 text-gray-900 focus:ring-0 search"
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="z-1 absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="relative mt-1 max-h-80 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm option">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"
                              }`}
                          >
                            <CheckIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <SearchButton onClick={clickHandler} />
     {show && data.length === 0 ? <NoResultsFound/> : <ShowCard data={data} date={props.date} />}
    </div>
  );
}