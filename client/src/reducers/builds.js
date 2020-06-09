// import types
import {
  ADD_CPU,
  REMOVE_CPU,
  LOAD_BUILD,
  ERROR_BUILD,
  LOAD_INITIAL_BUILDS,
  LOAD_INITIAL_CPUS,
  LOAD_INITIAL_CPU_COOLERS,
  ADD_CPU_COOLER,
  REMOVE_CPU_COOLER,
  GET_LOAD_BUILDS,
} from "../actions/types";

// requires an initial state
const initialState = {
  load_builds: {},
  cpu: {
    headers: [
      "Name",
      "Cores",
      "Core Clock",
      "Boosted Clock",
      "Manufacturer",
      "Price",
    ],
    selected: {
      name: "Ryzen 5 3600 4.2GHz 6 Core Processor",
      price: "153",
      currency: "£",
      website: "amazon.co.uk",
      url:
        "https://www.amazon.co.uk/AMD-Ryzen-3600-Processor-Cache/dp/B07STGGQ18/ref=sr_1_1?dchild=1&keywords=Ryzen+6+3600+3.6GHz+6+Core+Processor&qid=1590522175&sr=8-1",
      image_url:
        "https://images-na.ssl-images-amazon.com/images/I/71zVPc8ItVL._AC_SL1384_.jpg",
    },
    headers_component_list: [
      "name",
      "cores",
      "core_clock",
      "boosted_clock",
      "manufacturer",
      "price_combined",
    ],
    component_list: [],
  },
  cpu_cooler: {
    headers: ["Name", "Fan Speed", "Noise Level", "Manufacturer", "Price"],
    selected: {
      name: "",
      price: "",
      currency: "",
      website: "",
      url: "",
      image_url: "",
    },
    headers_component_list: [
      "name",
      "fan_rpm",
      "noise_level",
      "manufacturer",
      "price_combined",
    ],
    component_list: [],
  },
  motherboard: {
    headers: [
      "Name",
      "Socket/CPU",
      "Form Factor",
      "Max Memory",
      "Memory Slots",
      "Price",
    ],
    selected: {
      name: "",
      price: "",
      currency: "",
      website: "",
      url: "",
      image_url: "",
    },
    headers_component_list: [
      "name",
      "socket_cpu",
      "form_factor",
      "max_memory",
      "price_combined",
    ],
    component_list: [
      {
        _id: 1,
        name: "MSI B450 TOMAHAWK MAX",
        socket_cpu: "	AM4",
        form_factor: "ATX",
        max_memory: "64 GB",
        currency: "£",
        website: "amazon.co.uk",
        price_combined: "£114.99",
        url:
          "https://www.amazon.co.uk/AMD-Ryzen-3600-Processor-Cache/dp/B07STGGQ18/ref=sr_1_1?dchild=1&keywords=Ryzen+6+3600+3.6GHz+6+Core+Processor&qid=1590522175&sr=8-1",
        image_url:
          "https://images-na.ssl-images-amazon.com/images/I/71zVPc8ItVL._AC_SL1384_.jpg",
      },
    ],
  },
  loading: true,
  error: {},
};

function updateComponents(components) {}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_BUILD: {
      // TODO, restructure this data coming in some other way

      let components = payload.components;
      console.log("Components found is: " + components);
      // Loop through each component and match it.
      let cpuLoad = components.find((component) => component.type === "cpu");
      let cpu_coolerLoad = components.find(
        (component) => component.type === "cpu_cooler"
      );
      return {
        ...state,
        cpu: {
          ...state.cpu,
          selected: cpuLoad,
        },
        cpu_cooler: {
          ...state.cpu_cooler,
          selected: cpu_coolerLoad,
        },
      };
    }

    case LOAD_INITIAL_BUILDS: {
      return state;
    }
    case GET_LOAD_BUILDS: {
      return {
        ...state,
        load_builds: payload,
      };
    }

    case LOAD_INITIAL_CPUS: {
      return {
        ...state,
        cpu: {
          ...state.cpu,
          component_list: payload,
        },
      };
    }

    case LOAD_INITIAL_CPU_COOLERS: {
      return {
        ...state,
        cpu_cooler: {
          ...state.cpu_cooler,
          component_list: payload,
        },
      };
    }

    case LOAD_BUILD: {
      return {
        ...state,
        cpu: payload.cpu,
        cpu_cooler: payload.cpu_cooler,
        motherboard: payload.motherboard,
        loading: false,
      };
    }
    case ADD_CPU:
      return {
        ...state,
        cpu: {
          ...state.cpu,
          selected: payload,
        },
      };
    case ADD_CPU_COOLER:
      return {
        ...state,
        cpu_cooler: {
          ...state.cpu_cooler,
          selected: payload,
        },
      };
    case REMOVE_CPU:
      return {
        ...state,
        cpu: {
          ...state.cpu,
          selected: {
            name: "",
            price: "",
            currency: "",
            website: "",
            img_url: "",
          },
        },
      };
    case REMOVE_CPU_COOLER:
      return {
        ...state,
        cpu_cooler: {
          ...state.cpu_cooler,
          selected: {
            name: "",
            price: "",
            currency: "",
            website: "",
            img_url: "",
          },
        },
      };
    case ERROR_BUILD: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }
    default:
      return state;
  }
}
